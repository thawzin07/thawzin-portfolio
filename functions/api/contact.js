const MAX_CONTENT_LENGTH = 12000;

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Content-Type-Options": "nosniff",
    },
  });

const isEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isPhone = (value) =>
  !value || (typeof value === "string" && /^[0-9()+.\-\s]{0,32}$/.test(value));

const clean = (value) => (typeof value === "string" ? value.trim() : "");

const verifyTurnstile = async (token, remoteIp, env) => {
  if (!env.TURNSTILE_SECRET_KEY) return;

  if (!token) {
    throw new Response(
      JSON.stringify({ detail: "Human verification is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);
  if (remoteIp) formData.append("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    },
  );
  const result = await response.json();

  if (!result.success) {
    throw new Response(
      JSON.stringify({ detail: "Human verification failed." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
};

export async function onRequestPost({ request, env }) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_CONTENT_LENGTH) {
    return jsonResponse({ detail: "Request body is too large." }, 413);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
    return jsonResponse({ detail: "Contact service is not configured." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ detail: "Invalid request body." }, 400);
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const countryCode = clean(body.countryCode);
  const phone = clean(body.phone);
  const query = clean(body.query);
  const website = clean(body.website);

  if (website) {
    return jsonResponse({ detail: "Invalid submission." }, 400);
  }

  if (
    name.length < 2 ||
    name.length > 80 ||
    !isEmail(email) ||
    !/^\+[0-9][0-9\s]{0,18}$/.test(countryCode) ||
    !isPhone(phone) ||
    query.length < 10 ||
    query.length > 2000
  ) {
    return jsonResponse({ detail: "Please check the form and try again." }, 400);
  }

  try {
    await verifyTurnstile(
      body.turnstileToken,
      request.headers.get("CF-Connecting-IP"),
      env,
    );
  } catch (response) {
    return response;
  }

  const message = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone ? `${countryCode} ${phone}` : "Not provided"}`,
    "",
    "Message:",
    query,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: "New Contact Form Submission",
      text: message,
    }),
  });

  if (!response.ok) {
    return jsonResponse({ detail: "Failed to send email." }, 500);
  }

  return jsonResponse({ message: "Message sent successfully" });
}

export function onRequestOptions() {
  return new Response(null, { status: 204 });
}

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const buildDirectory = path.resolve(root, "build");
const indexPath = path.join(buildDirectory, "index.html");
const manifestPath = path.join(buildDirectory, ".vite", "manifest.json");
const siteUrl = "https://thawzinhtun.com";

const escapeAttribute = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeText = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const replaceMarkedAttribute = (html, marker, attribute, value) => {
  const pattern = new RegExp(
    `(<(?:meta|link)\\b(?=[^>]*\\bdata-seo="${marker}")[^>]*\\b${attribute}=")[^"]*(")`,
    "i",
  );

  if (!pattern.test(html)) {
    throw new Error(`Could not find SEO marker '${marker}' in the HTML template.`);
  }

  return html.replace(pattern, (_, prefix, suffix) =>
    `${prefix}${escapeAttribute(value)}${suffix}`,
  );
};

const replaceTitle = (html, title) => {
  const pattern = /<title\b[^>]*data-seo="title"[^>]*>[\s\S]*?<\/title>/i;
  if (!pattern.test(html)) {
    throw new Error("Could not find the SEO title marker in the HTML template.");
  }
  return html.replace(pattern, `<title data-seo="title">${escapeText(title)}</title>`);
};

const renderDocument = (template, markup, route, seo, projectImage, buildStructuredData) => {
  const canonical = `${siteUrl}${route}`;
  const image = projectImage || `${siteUrl}/assets/thaw-zin-htun-profile.jpg`;
  const imageAlt = seo.project
    ? `${seo.project.title} application screenshot`
    : "Profile photo of Thaw Zin Htun";
  const imageType = image.toLowerCase().includes(".png") ? "image/png" : "image/jpeg";

  let html = template;
  html = replaceTitle(html, seo.title);
  html = replaceMarkedAttribute(html, "description", "content", seo.description);
  html = replaceMarkedAttribute(html, "canonical", "href", canonical);
  html = replaceMarkedAttribute(html, "og-title", "content", seo.title);
  html = replaceMarkedAttribute(html, "og-description", "content", seo.description);
  html = replaceMarkedAttribute(html, "og-type", "content", seo.type || "website");
  html = replaceMarkedAttribute(html, "og-url", "content", canonical);
  html = replaceMarkedAttribute(html, "og-image", "content", image);
  html = replaceMarkedAttribute(html, "og-image-alt", "content", imageAlt);
  html = replaceMarkedAttribute(html, "og-image-type", "content", imageType);
  html = replaceMarkedAttribute(html, "twitter-title", "content", seo.title);
  html = replaceMarkedAttribute(html, "twitter-description", "content", seo.description);
  html = replaceMarkedAttribute(html, "twitter-image", "content", image);
  html = replaceMarkedAttribute(html, "twitter-image-alt", "content", imageAlt);

  const structuredData = JSON.stringify(
    buildStructuredData(route, seo, image),
  ).replaceAll("<", "\\u003c");
  const schemaPattern = /(<script\b[^>]*id="route-structured-data"[^>]*>)[\s\S]*?(<\/script>)/i;
  if (!schemaPattern.test(html)) {
    throw new Error("Could not find the structured data script in the HTML template.");
  }
  html = html.replace(schemaPattern, (_, openTag, closeTag) =>
    `${openTag}${structuredData}${closeTag}`,
  );

  const rootPattern = /<div id="root"><\/div>/;
  if (!rootPattern.test(html)) {
    throw new Error("Could not find the empty React root in the HTML template.");
  }
  return html.replace(rootPattern, `<div id="root">${markup}</div>`);
};

const sitemapXml = (routes) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join("\n")}
</urlset>
`;

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const template = await readFile(indexPath, "utf8");
const builtAssetUrls = Object.entries(manifest)
  .filter(([, entry]) => entry.file)
  .map(([source, entry]) => [
    `/${source.replace(/^\/+/, "")}`,
    `/${entry.file.replace(/^\/+/, "")}`,
  ]);
const vite = await createServer({
  configFile: path.join(root, "vite.config.js"),
  mode: "production",
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "error",
});

try {
  const [{ render }, appModule, projectModule] = await Promise.all([
    vite.ssrLoadModule("/src/entry-server.jsx"),
    vite.ssrLoadModule("/src/App.jsx"),
    vite.ssrLoadModule("/src/data/projects.js"),
  ]);
  const { buildStructuredData, getSeoForPath } = appModule;
  const { projects } = projectModule;
  const routes = [
    "/",
    "/education",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  const resolveProjectImage = (project) => {
    const source = project.img.replace(/^\/+/, "");
    const entry = manifest[source] || Object.values(manifest).find((item) => item.src === source);
    if (!entry?.file) {
      throw new Error(`No built image asset found for project '${project.slug}' (${source}).`);
    }
    return new URL(`/${entry.file.replace(/^\/+/, "")}`, siteUrl).href;
  };

  for (const route of routes) {
    const seo = getSeoForPath(route);
    if (route.startsWith("/projects/") && !seo.project) {
      throw new Error(`No project SEO data found for route '${route}'.`);
    }

    const projectImage = seo.project ? resolveProjectImage(seo.project) : undefined;
    let markup = render(route);
    for (const [sourceUrl, builtUrl] of builtAssetUrls) {
      markup = markup.replaceAll(sourceUrl, builtUrl);
    }
    if (markup.includes("/src/assets/")) {
      throw new Error(`Unresolved source image path in prerendered route '${route}'.`);
    }
    const html = renderDocument(
      template,
      markup,
      route,
      seo,
      projectImage,
      buildStructuredData,
    );
    const outputPath =
      route === "/"
        ? indexPath
        : path.join(buildDirectory, route.slice(1), "index.html");

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf8");
    console.log(`Prerendered ${route}`);
  }

  await writeFile(path.join(buildDirectory, "sitemap.xml"), sitemapXml(routes), "utf8");
  console.log(`Generated sitemap with ${routes.length} canonical URLs.`);
  await rm(path.dirname(manifestPath), { recursive: true, force: true });
} finally {
  await vite.close();
}

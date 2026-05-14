import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export type DocSection = "brandbook" | "migration";

export type DocItem = {
  slug: string[];
  title: string;
  filePath: string;
  section: DocSection;
};

const SITE_LIB_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SITE_LIB_DIR, "../..");

const SECTIONS: Record<DocSection, string> = {
  brandbook: "docs",
  migration: "docs/migration",
};

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const resolved = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(resolved);
    }

    if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      return [resolved];
    }

    return [];
  });
}

export function getDocs(section: DocSection): DocItem[] {
  const baseDir = path.join(ROOT, SECTIONS[section]);

  if (!fs.existsSync(baseDir)) {
    return [];
  }

  return walk(baseDir)
    .filter((filePath) => {
      const relative = path.relative(baseDir, filePath);
      return section === "brandbook" ? !relative.startsWith(`migration${path.sep}`) : true;
    })
    .map((filePath) => {
      const relative = path.relative(baseDir, filePath);
      const slug = relative.replace(/\.mdx?$/, "").split(path.sep);

      const raw = fs.readFileSync(filePath, "utf-8");
      const firstHeading = raw.match(/^#\s+(.+)$/m)?.[1];

      return {
        slug,
        title: firstHeading || slug[slug.length - 1],
        filePath,
        section,
      };
    });
}

export function getAllDocs(): DocItem[] {
  return (Object.keys(SECTIONS) as DocSection[]).flatMap((section) => getDocs(section));
}

export function getDocBySlug(section: DocSection, slug: string[]) {
  return getDocs(section).find((doc) => doc.slug.join("/") === slug.join("/"));
}

export function readDoc(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

import fs from "fs";
import path from "path";

describe("storybook preview style contract", () => {
  it("imports every package CSS surface used by component stories", () => {
    const stylesDir = path.resolve(__dirname, "../../packages/ui/src/styles");
    const previewPath = path.resolve(__dirname, "../.storybook/preview.ts");
    const previewSource = fs.readFileSync(previewPath, "utf8");

    const cssFiles = fs
      .readdirSync(stylesDir)
      .filter((fileName) => fileName.endsWith(".css"))
      .sort();

    const missingImports = cssFiles.filter(
      (fileName) => !previewSource.includes(`@metraly/ui/styles/${fileName}`),
    );

    expect(missingImports).toEqual([]);
  });

  it("keeps dashboard editor dependency CSS in Storybook", () => {
    const previewPath = path.resolve(__dirname, "../.storybook/preview.ts");
    const previewSource = fs.readFileSync(previewPath, "utf8");

    expect(previewSource).toContain("react-grid-layout/css/styles.css");
    expect(previewSource).toContain("react-resizable/css/styles.css");
  });
});

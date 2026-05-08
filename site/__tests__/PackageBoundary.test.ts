import fs from 'fs';
import path from 'path';

function collectSourceFiles(rootDir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  walk(rootDir);
  return files;
}

describe('site package boundary', () => {
  it('does not import packages/ui source files directly from site app code', () => {
    const siteRoot = path.resolve(__dirname, '..');
    const scanRoots = [path.join(siteRoot, 'app'), path.join(siteRoot, 'lib')].filter((root) => fs.existsSync(root));
    const violations: string[] = [];

    for (const root of scanRoots) {
      for (const filePath of collectSourceFiles(root)) {
        const contents = fs.readFileSync(filePath, 'utf8');
        if (contents.includes('packages/ui/src') || contents.includes('../packages/ui/src') || contents.includes('../../packages/ui/src')) {
          violations.push(path.relative(siteRoot, filePath));
        }
      }
    }

    expect(violations).toEqual([]);
  });
});

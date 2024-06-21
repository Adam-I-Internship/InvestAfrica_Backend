// NOTE: This script adds '.js' to the end of imports in the final build ./dist folder
// ! The backend will not build without corrected import statements

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const replaceImports = (directory: string): void => {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      replaceImports(filePath);
    } else if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      // * This regex checks for relative paths that start with './' or '../'
      content = content.replace(/import\s+(.+?)\s+from\s+['"](\..+?)['"]/g, (match, p1, p2) => {
        if (!p2.endsWith('.js')) return `import ${p1} from '${p2}.js'`;
        return match;
      });
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
};

const directoryPath = path.join(currentDirectory, '../dist');
replaceImports(directoryPath);

/**
 * SCSSファイルをdistディレクトリにコピーするスクリプト
 */
const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
  let targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  let files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else if (path.extname(curSource) === '.scss') {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

// srcディレクトリのSCSSファイルをdistディレクトリにコピー
function copyStyles() {
  const srcDir = path.join(__dirname, 'src');
  const distDir = path.join(__dirname, 'dist');

  function processDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const srcPath = path.join(dir, item);
      const stat = fs.lstatSync(srcPath);
      
      if (stat.isDirectory()) {
        // ディレクトリの場合は再帰的に処理
        processDirectory(srcPath, path.join(relativePath, item));
      } else if (path.extname(item) === '.scss') {
        // SCSSファイルの場合はコピー
        const destDir = path.join(distDir, relativePath);
        const destPath = path.join(destDir, item);
        
        // ディレクトリが存在しない場合は作成
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // ファイルをコピー
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${path.join(relativePath, item)}`);
      }
    });
  }

  processDirectory(srcDir);
}

copyStyles();
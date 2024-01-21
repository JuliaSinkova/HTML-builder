const fs = require('fs/promises');
const path = require('path');

async function createProjectDist() {
    const distDir = path.join(__dirname, 'project-dist');
    await fs.mkdir(distDir, { recursive: true });
    await createHtml(distDir);
    await mergeStyles(distDir);
    await copyDir(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));
}

async function createHtml(distDir) {
    const templatePath = path.join(__dirname, 'template.html');
    const componentsDir = path.join(__dirname, 'components');
    let template = await fs.readFile(templatePath, 'utf8');

    const componentFiles = await fs.readdir(componentsDir);
    for (const file of componentFiles) {
        if (path.extname(file) === '.html') {
            const name = path.basename(file, '.html');
            const componentContent = await fs.readFile(path.join(componentsDir, file), 'utf8');
            template = template.replace(`{{${name}}}`, componentContent);
        }
    }

    await fs.writeFile(path.join(distDir, 'index.html'), template);
}

async function mergeStyles(distDir) {
    const stylesDir = path.join(__dirname, 'styles');
    const outputFile = path.join(distDir, 'style.css');

    const files = await fs.readdir(stylesDir);
    const cssContents = await Promise.all(files
        .filter(file => path.extname(file) === '.css')
        .map(async file => fs.readFile(path.join(stylesDir, file), 'utf8')));

    await fs.writeFile(outputFile, cssContents.join('\n'));
}

async function copyDir(srcDir, destDir) {
    await fs.mkdir(destDir, { recursive: true });
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

createProjectDist().catch(err => console.error(err));

const fs = require('fs/promises');
const path = require('path');

async function compileStyles() {
    const stylesDir = path.join(__dirname, 'styles');
    const outputDir = path.join(__dirname, 'project-dist');
    const outputFile = path.join(outputDir, 'bundle.css');

    try {
        await fs.mkdir(outputDir, { recursive: true });

        const files = await fs.readdir(stylesDir);

        const cssContents = await Promise.all(files
            .filter(file => path.extname(file) === '.css')
            .map(async file => {
                const filePath = path.join(stylesDir, file);
                return fs.readFile(filePath, 'utf8');
            }));

  
        await fs.writeFile(outputFile, cssContents.join('\n'));
        
        console.log('Styles compiled into bundle.css successfully.');
    } catch (err) {
        console.error('Error during compilation:', err);
    }
}

compileStyles();

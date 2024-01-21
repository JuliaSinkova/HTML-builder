const fs = require('fs/promises');
const path = require('path');


async function copyDir() {
    const sourceDir = path.join(__dirname, 'files');
    const destinationDir = path.join(__dirname, 'files-copy');

    try {
       
        await fs.mkdir(destinationDir, { recursive: true });

    
        const files = await fs.readdir(sourceDir);

       
        for (const file of files) {
            const srcFile = path.join(sourceDir, file);
            const destFile = path.join(destinationDir, file);
            await fs.copyFile(srcFile, destFile);
        }

        console.log('Files copied successfully');
    } catch (err) {
        console.error('Error during copying:', err);
    }
}


copyDir();

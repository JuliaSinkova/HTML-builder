const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');


fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.error("Error reading the directory:", err);
        return;
    }

    files.forEach(file => {
     
        if (file.isFile()) {
          
            const filePath = path.join(folderPath, file.name);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error("Error getting file stats:", err);
                    return;
                }
                const fileName = path.basename(file.name, path.extname(file.name));
                const fileExt = path.extname(file.name).slice(1);
                const fileSize = (stats.size / 1024).toFixed(3);

                console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
            });
        }
    });
});

const fs = require('fs');
const path = require('path');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const filePath = path.join(__dirname, 'output.txt');

console.log("Hello! Please enter the text:");

rl.on('line', (input) => {
  
    fs.writeFile(filePath, input, (err) => {
        if (err) {
            console.error("Error writing to the file:", err);
        } else {
            console.log('Text has been written to the file.');
        }
        rl.close();
    });
});

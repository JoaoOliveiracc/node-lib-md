import fs from 'fs';
import chalk from 'chalk';

function getFile(filePath) {
    const encode = 'UTF-8';
    fs.readFile(filePath, encode, (_, text) => {
        console.log(chalk.green(text));
    })
}

getFile('./arquivos/texto.md');
import fs from 'fs';
import chalk from 'chalk';

function trateErro(err) {
    throw new Error(chalk.red(err.code, 'Não há arquivo no diretório'))
}

function getFile(filePath) {
    const encode = 'UTF-8';
    fs.promises
        .readFile(filePath, encode)
        .then((text) => console.log(chalk.green(text)))
        .catch(trateErro)
}

getFile('./arquivos/texto.md');
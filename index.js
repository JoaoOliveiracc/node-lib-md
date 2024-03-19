import fs from 'fs';
import chalk from 'chalk';

function trateErro(error) {
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório'))
}

async function getFile(filePath) {
    try {
        const encode = 'UTF-8';
        const text = await fs.promises.readFile(filePath, encode)
        console.log(chalk.green(text))
    } catch (error) {
        trateErro(error)
    }
}

getFile('./arquivos/texto.md');
import fs from 'fs';
import chalk from 'chalk';

function trateErro(error) {
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório'));
}

function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const catches = [...text.matchAll(regex)];
    const results = catches.map(item => ({[item[1]]: item[2]}));
    
    return results.length !== 0 ? results : "URL's not found";
}

async function getFile(filePath) {
    try {
        const encode = 'UTF-8';
        const text = await fs.promises.readFile(filePath, encode);

        return extractLinks(text);
    } catch (error) {
        trateErro(error);
    }
}

export default getFile;
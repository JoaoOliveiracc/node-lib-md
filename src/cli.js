import getFile from "./index.js";
import fs from 'fs';
import chalk from 'chalk';

const path = process.argv;

function printList(result, identifier = '') {
    console.log(
        chalk.yellow("Lista de URL's",
        chalk.black.bgGreen(identifier),
        result)
    );
}

async function textProcessing(args) {
    const path = args[2];

    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Path or file not found!');
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        printList(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async(fileName) => {
            const list = await getFile(`${path}/${fileName}`);
            printList(list, fileName);
        })
    }
}

textProcessing(path)
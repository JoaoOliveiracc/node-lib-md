import getFile from "./index.js";
import fs from 'fs';
import chalk from 'chalk';
import { validatedList } from "./http-validation.js";

const path = process.argv;

async function printList(validate, result, identifier = '') {
    if (validate) {
        console.log(
            chalk.yellow("Lista validada",
            chalk.black.bgGreen(identifier),
            await validatedList(result))
        );
    } else {
        console.log(
            chalk.yellow("Lista de URL's",
            chalk.black.bgGreen(identifier),
            result)
        );
    }
}

async function textProcessing(args) {
    const path = args[2];
    const validate = args[3] === '--valid';
    
    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Path or file not found!');
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        printList(validate, result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async(fileName) => {
            const list = await getFile(`${path}/${fileName}`);
            printList(validate, list, fileName);
        })
    }
}

textProcessing(path)
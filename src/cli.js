import getFile from "./index.js";
import fs from 'fs';
import chalk from "chalk";

const path = process.argv;

getFile(path[2]);

async function textProcessing(args) {
    const path = args[2];

    if (fs.lstatSync(path).isFile()) {
        const result = await getFile(path);
        console.log(result);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async(fileName) => {
            const list = await getFile(`${path}/${fileName}`);

        })
    }
}

textProcessing(path)
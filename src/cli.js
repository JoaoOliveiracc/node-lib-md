import getFile from "./index.js";
import chalk from "chalk";

const path = process.argv;

getFile(path[2]);

async function textProcessing(path) {
    const result = await getFile(path[2]);
    console.log(result);
}

textProcessing(path)
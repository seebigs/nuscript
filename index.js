import { resolve } from 'path';
import { parse } from './src/parse.js';
import { generate } from './src/generate.js';

/**
 * @param {string} filename
 */
export async function transpileNu (filename, usingCLI = false) {
    const filepath = resolve(filename);

    const parsedTree = await parse(filepath);
    console.log(JSON.stringify(parsedTree, null, 4));
    
    // const generated = generate(parsedTree);
    // console.log(generated.code);
}

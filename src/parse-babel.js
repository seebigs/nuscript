import { parse as babelParse } from '@babel/parser';
import { readFile } from './files.js';

/**
 * @param {string} filepath
 */
export async function parseBabel (filepath) {
    const contents = await readFile(filepath);
    const parsed = babelParse(contents);
    return parsed;
}

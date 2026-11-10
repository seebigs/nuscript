import { promises as fs } from 'fs';

/**
 * @param {string} filepath
 */
export async function makeDir (filepath) {
    try {
        await fs.mkdir(filepath);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

/**
 * @param {string} filepath
 */
export async function readFile (filepath) {
    return await fs.readFile(filepath, 'utf8');
}

/**
 * @param {string} content
 * @param {string} filepath
 */
export async function writeFile (filepath, content) {
    fs.writeFile(filepath, content)
}

#!/usr/bin/env node

import { parseBabel } from './src/parse-babel.js';
import { makeDir, writeFile } from './src/files.js';
import { transpileNu } from './index.js';

makeDir('./output');
transpileNu('./demo.nu');

const parsed = await parseBabel('./demo.js');
writeFile('./output/babelTree.json', JSON.stringify(parsed, null, 4));


// import minimist from 'minimist';
// const { _:files } = minimist(process.argv.slice(2));

// if (files.length) {
//     const nuScript = new NuScript({}, true);
//     for await (const filename of files) {

//     }
//     // files.forEach(async (statement) => {
//     //     try {
//     //         const results = await fauxSQL(statement);
//     //         if (results) {
//     //             console.log(results);
//     //         }
//     //     } catch (err) {
//     //         console.log('\nError:', err);
//     //     }
//     // });
// }

import jsTokens from "js-tokens";
import { readFile } from './files.js';
import parseBuilders from "./parse-builders.js";
import { isBlockTerminator, isLineTerminator, isVariableDeclaration, isWhiteSpace } from "./parse-helpers.js";

function newAST ({ body = [], column, line, index }) {
    const loc = {
        start: {
            line: 1,
            column: 0,
            index: 0,
        },
        end: {
            line,
            column,
            index,
        },
    };
    return {
        type: 'File',
        start: 0,
        end: index,
        loc,
        errors: [],
        program: {
            type: 'Program',
            start: 0,
            end: index,
            loc,
            sourceType: 'script',
            body,
        },
    };
}

/**
 * @param {jsTokens.Token[]} tokens
 */
function nestTokens (tokens) {
    let line = 1;
    let column = 0;
    let index = 0;

    const body = [];
    const blocks = [{
        type: 'Program'
    }];


    tokens.forEach(({ type, value }) => {
        if (isLineTerminator(type)) {
            line += 1;
            column = 0;            
            index += 1;
            return;
        }

        const loc = {
            start: {
                line,
                column,
                index,
            },
            end: {},
        };
        const len = value.length;
        column += len;
        index += len;

        if (isWhiteSpace(type)) {
            return;
        }

        const currentBlock = blocks[blocks.length - 1];

        if (isBlockTerminator(currentBlock.terminator, type, value)) {
            currentBlock.end = index;
            currentBlock.loc.end.line = line;
            currentBlock.loc.end.column = column;
            currentBlock.loc.end.index = index;
            console.log('BLOCK TERM');
            body.push(blocks.pop());
            return;
        }

        if (isVariableDeclaration(type, value)) {
            blocks.push({
                type: 'VariableDeclaration',
                declarations: [],
                kind: value,
                start: loc.start.index,
                end: index,
                loc,
            });
            return;
        }

        const parseBuilder = parseBuilders[currentBlock.type];
        if (typeof parseBuilder !== 'function') {
            throw new Error(`${currentBlock.type} parse builder is not yet supported`);
        }
        parseBuilder(currentBlock, type, value, loc, line, column, index);
    });

    return {
        body,
        column,
        line,
        index,
    };

    // const nextToken = remainingTokens.unshift();
    // if (hasBody(nextToken)) {
        
    // }
    
    // for (const token of tokenized) {
        
    //     const { type, value } = token;

    //     if (isVariableDeclaration(type, value)) {
    //         nested.push({
    //             type: 'VariableDeclaration',

    //         });
    //     }
    // }
}


/**
 * @param {string} contents
 */
function parseToAST (contents) {
    
    const tokenized = jsTokens(contents);
    const tokens = Array.from(tokenized);
    console.log(tokens);
    const nestedTokens = nestTokens(tokens);
    console.log(nestedTokens);
    const ast = newAST(nestedTokens);
    return ast;
}

/**
 * @param {string} filepath
 */
export async function parse (filepath) {
    // return await parseBabel(filepath);
    const contents = await readFile(filepath);
    return parseToAST(contents);
}

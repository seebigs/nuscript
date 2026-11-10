
// export function hasBody (type, value) {
//     if (type === 'IdentifierName') {
//         return value === 'function';
//     }
//     return false;
// }

export function isBlockTerminator (terminator, type, value) {
    if (terminator) {
        return type === terminator.type && value === terminator.value;
    }
    return type === 'Punctuator' && value === ';';
}

export function isLineTerminator (type) {
    return type === 'LineTerminatorSequence';
}

export function isVariableDeclaration (type, value) {
    const validVarKinds = ['const', 'let'];
    return type === 'IdentifierName' && validVarKinds.indexOf(value) !== -1;
}

export function isWhiteSpace (type) {
    return type === 'WhiteSpace';
}

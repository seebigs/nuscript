export default {

    VariableDeclaration: (currentBlock, type, value, loc, line, column, index) => {
        console.log('AHH', currentBlock, type);
        if (type === 'IdentifierName') {
            currentBlock.declarations.push({
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: value,
                    start: loc.start.index,
                    end: index,
                    loc: {
                        start: {
                            line: loc.start.line,
                            column: loc.start.column,
                            index: loc.start.index,
                        },
                        end: {
                            line,
                            column,
                            index,
                        },
                    },
                },
                start: loc.start.index,
                end: index,
                loc,
            });
            return;
        }

        const declaration = currentBlock.declarations[currentBlock.declarations.length - 1];
        declaration.end = index;
        declaration.loc.end.line = line;
        declaration.loc.end.column = column;
        declaration.loc.end.index = index;

        if (type === 'BooleanLiteral') {
            declaration.init = {
                type: 'BooleanLiteral',
                value: value,
                start: loc.start.index,
                end: index,
                loc: {
                    start: {
                        line: loc.start.line,
                        column: loc.start.column,
                        index: loc.start.index,
                    },
                    end: {
                        line,
                        column,
                        index,
                    },
                },
            };
            return;
        }
        
        if (type === 'NumericLiteral') {
            const parsedValue = Number(value);
            declaration.init = {
                type: 'NumericalLiteral',
                extra: { rawValue: parsedValue, raw: value },
                value: parsedValue,
                start: loc.start.index,
                end: index,
                loc: {
                    start: {
                        line: loc.start.line,
                        column: loc.start.column,
                        index: loc.start.index,
                    },
                    end: {
                        line,
                        column,
                        index,
                    },
                },
            };
            return;
        }

        if (type === 'StringLiteral') {
            const parsedValue = eval(value);
            declaration.init = {
                type: 'StringLiteral',
                extra: { rawValue: parsedValue, raw: value },
                value: parsedValue,
                start: loc.start.index,
                end: index,
                loc: {
                    start: {
                        line: loc.start.line,
                        column: loc.start.column,
                        index: loc.start.index,
                    },
                    end: {
                        line,
                        column,
                        index,
                    },
                },
            };
            return;
        }
    },

};

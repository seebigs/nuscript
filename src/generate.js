import BabelGenerator from '@babel/generator';

// @ts-ignore
const { default: babelGenerate } = BabelGenerator;

export function generate (ast) {
    return babelGenerate(ast);
}


## Build Steps
- Parse entry file
- Parse imported files
- Assemble parsed application
- Static checks and analysis
- Transpile/Generate into JavaScript
- Bundle for deployment
- Execute

Styntax Tree Standard:
[ESTree Spec](https://github.com/estree/estree)

## Parsers
Acorn
Babel

## Generators
[escodegen](https://github.com/estools/escodegen)
[Babel/generator](https://babeljs.io/docs/babel-generator)

Probably should just use Babel for both

```

function doStuff   (one, two) {
    const three = 3;
    return one + two + three;
}

doStuff(1, 2);

```

function doStuff () {
    const three =  3;
}
() => { true }

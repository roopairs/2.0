const fs = require('fs');

const imageFileNames = () => {
    const array = fs
        .readdirSync('res/assets/images')
        .filter(file => {
            return file.endsWith('.png');
        })
        .map(file => {
            return file.replace(/(@)(\d+)(x)/g, ''); // .replace('@3x.png', '')
        })
        .map(file => {
            return file.replace('.png', ''); // .replace('@3x.png', '')
        });

    return Array.from(new Set(array));
};

const generate = () => {
    const properties = imageFileNames()
        .map(name => {
            return `const ${name} = require('./assets/images/${name}.png')`;
        })
        .join(';\n');

    const exportImages = imageFileNames()
        .map(name => {
            return `\n\t${name}`;
        })
        .join(',');
    const string = `${properties}

export { ${exportImages}
}
`;

    fs.writeFileSync('res/images.tsx', string, 'utf8');
};

const generateMock = () => {
    const properties = imageFileNames()
        .map(name => {
            return `const ${name} = null`;
        })
        .join(';\n');

    const exportImages = imageFileNames()
        .map(name => {
            return `\n\t${name}`;
        })
        .join(',');
    const string = `${properties}

export { ${exportImages}
}
`;

};

generate();
generateMock();
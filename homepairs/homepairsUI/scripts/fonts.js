/**
 * The fonts.js scripts should be executed by inputting the following command: 
 *      npm run fonts
 * This script will run  write into the res directory, the file that will allow access 
 * to the function for loading all fonts (for native applications) and the access of use 
 * to these fonts. Run this script whenever a new font is inputted into the res/assets/fonts 
 * folder. 
 * 
 */

const fs = require('fs')

const fontFileNames = () => {
  const array = fs
    .readdirSync('res/assets/fonts')
    .map((file) => {
      return file.replace('.ttf', '')
    })
    return Array.from(new Set(array))
}

const generate = () => {
  const loadedProperties = fontFileNames()
    .map((name) => {
      const key = name.replace(/\s/g, '')
      return `\tawait Font.loadAsync({
\t\t'${key.toLowerCase()}': require('./assets/fonts/${name}.ttf')
\t});`
    })
    .join('\n')
  
    const properties = fontFileNames()
        .map((name) => {
            const key = name.replace(/\s/g, '')
            return `\t${key.replace('-', '_').toLowerCase()}: '${name.toLowerCase()}'`
        }).join(',\n')

const string = `import * as Font from 'expo-font';

/** 
 * NOTICE: We are required to call the loadAsync multiple times. This is due to a bug in how non-Chrome 
 * web browsers appear to call this async function. If more than one asset is loaded, the function 
 * never does completed. Therefore, this is a hack-around for the problem. 
 * 
 * I may report this issue to expo.
*/
export const LoadFonts = async () => {
${loadedProperties}
}

export const HomePairFonts = {
${properties}
}
`

    fs.writeFileSync('res/fonts.web.tsx', string, 'utf8')
}

const generateWeb = () => {
  const loadedProperties = fontFileNames()
    .map((name) => {
      const key = name.replace(/\s/g, '')
      return `\t\t'${key.toLowerCase()}': require('./assets/fonts/${name}.ttf')`
    })
    .join(',\n')
  
    const properties = fontFileNames()
        .map((name) => {
            const key = name.replace(/\s/g, '')
            return `\t${key.replace('-', '_').toLowerCase()}: '${name.toLowerCase()}'`
        }).join(',\n')

const string = `import * as Font from 'expo-font';
export const LoadFonts = async () => {
\tawait Font.loadAsync({
\t\t//Load desired fonts into /res/assets/fonts and then run the script via: npm run fonts 
${loadedProperties}
\t});
}
export const HomePairFonts = {
${properties}
}
`

    fs.writeFileSync('res/fonts.tsx', string, 'utf8')
}


generate()
generateWeb()
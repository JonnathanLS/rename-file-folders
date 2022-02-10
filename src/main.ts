import { Path } from './path';

// TODO: Refactor to get parameters via command terminal
// console.log(`Enter the absolute path of the desired folder as the entry point!`);
// console.log(`If you need to customize the renaming of folder contents by a specific pattern, pass it as the second parameter separated by a space in JSON Stringfy format`);
// console.log(`   - For example: path/absolute/folder '{ "old": "new", "old-2": "new-2"}'`);

// const [folder] = process.argv.slice(0);
// const [pattern] = process.argv.slice(1);

// if (folder === undefined){
//     const nodeProcessRequired = `Digite o caminho absoluto da pasta desejada como ponto de entrada!`;
//     console.log(nodeProcessRequired);
// } else {
//     let path = new Path(folder, pattern);
//     path.renameContents();
// };

const pattern = {
    'S0': 'T',
    '720p.WEB-DL.AAC2.0.x264-Tars': '',
};

let path = new Path('/Users/T719516/Desktop/teste', { pattern });

path.renameContents();

const fs = require('fs');

// path to be searched
const path = "/home/jonnathan/mega/estudos/my-projects";

// logic for changing names
fs.readdir(path,(error, values)=>{
    listCurrentNames(path);
    values.map(value => setNew(value));
    listCurrentNames(path);
})
// configure and change to the new name
function setNew(name){
    const newName = name.toLowerCase().trim().replace(' ', '-');
    rename(path, name, newName); 
}
// change folder and file names
function rename(path, oldValue, newValue){
    path = path[path.length-1] === '/' ? path : path + '/';
    const oldPath = `${path}/${oldValue}`;
    const newPath = `${path}/${newValue}`;
    fs.renameSync(oldPath, newPath, () => log(`${value} changed to ${newValue}`)); 
}
// lists the files and folders in the given directory
function listCurrentNames(path) { 
    log("\nCurrent Names:\n"); 
    fs.readdirSync(path).forEach(value => log(value)); 
} 
// alias console.log
function log(data){  console.log(data) };
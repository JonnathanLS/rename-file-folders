const fs = require('fs');


const path = "./";

fs.readdir(path,(error, values)=>{
    listCurrentNames(path);
    values.map(value => {
        const newValue = value.toLowerCase();
        rename(value, newValue); 
    });
    listCurrentNames(path);
})

// function that renames the names
function rename(oldValue, newValue){
    fs.renameSync(oldValue, newValue, () => log(`${value} changed to ${newValue}`)); 
}
     
// function to list current names in informed path 
function listCurrentNames(path) { 
    log("\nCurrent Names:\n"); 
    fs.readdirSync(path).forEach(value => log(value)); 
} 
function log(data){ 
    console.log(data) 
};
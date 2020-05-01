const fs = require('fs');


const path = "/home/jonnathan/mega/estudos/my-projects/";
getCurrentNames();

// fs.readdir(path,(error, values)=>{
//     values.map(value => {
//         const newValue = value.toLowerCase();
//         fs.rename(value, newValue, () => log("\nChanged Names!\n")); 
//     });
//     getCurrentFilenames();
// })

// Test to rename the main.js file
fs.rename('main.js', 'index.js', () => { 
    log("\nFile Renamed!\n"); 
    // List all the names after renaming 
    getCurrentNames(path); 
}); 
     
// Function to get current names in root directory
function getCurrentNames() { 
    log("Current Names:"); 
    fs.readdirSync(__dirname).forEach(value => log(value)); 
} 
function log(data){ 
    console.log(data) 
};
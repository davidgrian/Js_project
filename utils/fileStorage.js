const fs = require('fs');
const path = require('path');


const readData = (filename) => {
   const filepath = path.resolve(filename);
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Something went wrong read');
    }
}
const writeData = (filename, data)=>{
    const filepath = path.resolve(filename);
    try{
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    } catch(err){
        throw new Error('Something went wrong write');
    }
}

module.exports = {readData,writeData};
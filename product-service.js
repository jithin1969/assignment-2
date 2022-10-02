let products = [];
let categories = [];

module.exports.initialize = () => {
    return new Promise ((resolve, reject) => {
        const fs = require('fs'); 
        fs.readFile('./data/products.json', (err,data) => {
            if (err) {
                reject ('unable to read file');
            }
            else {
                products = JSON.parse(data);
            }
        });

        fs.readFile('./data/categories.json', (err,data)=> {
            if (err) {
                reject ('unable to read file');
            }
            else {
                categories = JSON.parse(data);
            }
        })
        resolve();
    })
};

module.exports.getAllproducts = function(){
    return new Promise((resolve,reject)=>{
        if (products.length == 0) {
            reject("no results returned"); return;
        }

        resolve(products);
    })
}

module.exports.getPublishedProducts = function(){ 
    return new Promise((resolve,reject)=>{
        let i,published=[];
        for(i=0;i<products.length;i++){
            if(products[i].published==true){
                published.push(products[i])
            }
            
        }
        if (published.length == 0) {
            reject("no results returned"); return;
        }

        resolve(published);
    })
}

module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        if (categories.length == 0) {
            reject("no results returned"); return;
        }

        resolve(categories);
    })
}
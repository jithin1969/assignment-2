const express = require("express");
const app = express();
const path = require("path");

const dataService = require('./product-service.js');

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function(req,res){
  
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get("/products", (req,res) => {
    dataService.getPublishedProducts().then((data)=>{
        res.json(data); 
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/demos", (req,res) => {
    dataService.getAllProducts().then((data)=>{
        res.json(data); 
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/categories", (req,res) => {
    dataService.getCategories().then((data)=>{
        res.json(data); 
    }).catch((err)=>{
        res.send(err);
    });
});

app.use((req, res) => {
    res.status(404).send("<h2>404</h2><p>Page Not Found</p>");
});
  
  
dataService.initialize()
.then(()=>{
      app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
      console.log("Error: ", err)
})
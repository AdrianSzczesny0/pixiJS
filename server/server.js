const { v4 } = require('uuid');
const path = require('path');
const http = require("http");
const express = require("express");







const publicPath = path.join(__dirname, '/../public');
const port  = process.env.PORT || 3100
let app = express(express.json());
app.use(express.json());
app.use(express.static(publicPath));
let server = http.createServer(app);








// ==========================================================================================================================================================
// WEBSITE HANDLING

app.get('/test', (req,res) =>{
    res.status(200).send({
        message:"fuck you"
    })
    console.log('fuck you');
    // res.status(200);
    client.query('SELECT * FROM public.users;',(err, result)=>{
        if ( !err ){
            console.log(JSON.stringify(result.rows));
        }
    });
    client.end();
});



app.use(express.static(publicPath));

// ==========================================================================================================================================================




server.listen(port, () =>{
    console.log(`Server is running on port : ${port}`);
})


function log(value){
    console.log(value);
}

let myuuid = v4();
console.log(myuuid);
// Load some libraries
const express = require('express'); // look for [express directory] in [node_modules directory]. Other dependency refer to packege.json in package.
const path = require('path');

// create an instance of Express

const app = express();

// define our routes - rules to handle request.
app.use(
    express.static( // middleware to serve static files
        path.join(__dirname, "public")
    )
);

app.use(express.static(path.join(__dirname,"images")));


//catch all
app.use((req,resp)=>{
    resp.status(404);
    resp.sendFile(path.join(__dirname,'images','404logo.gif'))
})


// Start express and listen to a port.
// app.listen(3000,function(){})
app.listen(3000,() =>{
    console.info('Application started on port 3000');
    console.info('\truning directory is ', __dirname);
    console.info('\tpublic directory is ', path.join(__dirname, "public"));
    //let asdf = express.static(__dirname + "/public")
    //console.log(typeof asdf);

})


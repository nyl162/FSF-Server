const express = require ("express");
const path = require ("path");

const app = express();

app.use(express.static(path.join(__dirname,"dist","StarwarsApp")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"media")));

const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

//console.log(process.env.APP_PORT);

app.listen(PORT,()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`)
})
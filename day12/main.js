const path = require ('path');
const express = require ('express');

const app = express();





const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen ( PORT, ()=>{
    console.info( `Application started at port ${PORT} at ${new Date()}`)
})
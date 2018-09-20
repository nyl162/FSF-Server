const path = require('path');
const uuidV1 = require ('uuid/v1');
const express = require ('express');
const hbs = require('express-handlebars');


const app = express();
/*
app.get('/uuid',(req,res)=>{
    const uuid = uuidV1();
    res.status(200)
        .type('text/html')
        .send(`<h3><code>${uuid}</code></h3>`)
});
*/

app.engine('hbs',hbs({defaultLayout:'main.hbs'}))
app.set('view engine','hbs');

app.get('/uuid',(req,res)=>{
    const uuid = uuidV1();
    res.status(200);
    res.format({
        'text/html':()=>{
            res.render('uuid', {htmuuid:uuid, date: new Date()});
            //res.send(`<h3><code>${uuid}</code></h3>`)
        },
        'default':()=>{
            res.status(406);
        }
    });


});

app.use(express.static(path.join(__dirname,'public')));

PORT = parseInt(process.argv[2]) ||
    parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});
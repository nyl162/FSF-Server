const path = require ('path');
const express = require ('express');

const app = express();

const imageArr = [
    'acorn_squash.png',
    'apple.png',
    'bell_pepper.png',
    'blueberries.png',
    'broccoli.png',
    'carrot.png',
    'celery.png',
    'chili_pepper.png',
    'corn.png',
    'eggplant.png',
    'harold.png',
    'lettuce.png',
    'mushroom.png',
    'onion.png',
    'potato.png',
    'pumpkin.png',
    'radish.png',
    'squash.png',
    'strawberry.png',
    'sugar_snap.png',
    'tomato.png',
    'zucchini.png'
]

app.get('/image', (req,res,next)=>{
    let rand = Math.floor(Math.random() * (imageArr.length) );
    res.status(200);
    res.type('text/html');
    res.send(`<img src="/images/${imageArr[rand]}">`);
    //res.send(`<head><meta http-equiv="refresh" content="1"></head><img src="/images/${imageArr[rand]}">`);
    //res.end();
});
/*
app.get('/images/:imagefile', (req,res,next)=>{
    res.status(200);
    res.type('image/png');
    //console.log(path.join(__dirname, 'images',req.params.imagefile));
    res.sendFile(path.join(__dirname, 'images',req.params.imagefile));
    //res.send(path.join(__dirname,'images',res.imagefile));
    //res.end();
});
*/

app.use('/images',express.static(path.join(__dirname, 'images')));

app.get('/random-image', (req,res,next)=>{
    let rand = Math.floor(Math.random() * (imageArr.length) );
    //console.log(`rand = ${rand}, imglength = ${imageArr.length}`);
    res.status(200);
    res.type('image/png');
    //console.log(path.join(__dirname, 'images',req.params.imagefile));
    res.sendFile(path.join(__dirname, 'images',imageArr[rand]));
    //res.send(path.join(__dirname,'images',res.imagefile));
    //res.end();
});


const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen ( PORT, ()=>{
    console.info( `Application started at port ${PORT} at ${new Date()}`);
})
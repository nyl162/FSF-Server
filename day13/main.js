const path = require ('path');
const express = require ('express');

const fs = require('fs');

const resources = ['public','images']

const imageArr = [
/*    'acorn_squash.png',
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
    'zucchini.png'*/
];

fs.readdirSync(path.join(__dirname, 'images')).forEach(file => {
  imageArr.push(file);
 // console.log(imageArr);
})

const app = express();

const randImage = (array) => {
    const rand = Math.floor(Math.random() * (array.length) );
    return array[rand];
}

app.get('/image', (req,res,next)=>{
    //let rand = Math.floor(Math.random() * (imageArr.length) );
    res.status(200);
    res.type('text/html');
    res.send(`<img src="/${randImage(imageArr)}">`);
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
for (let res of resources) {
app.use(express.static(path.join(__dirname, res)));
}

app.get('/random-image', (req,res,next)=>{
    //let rand = Math.floor(Math.random() * (imageArr.length) );
    //console.log(`rand = ${rand}, imglength = ${imageArr.length}`);
    res.status(200);
    res.type('image/png');
        
    //res.type('text/plain');
    //console.log(path.join(__dirname, 'images',req.params.imagefile));
    res.sendFile(path.join(__dirname, 'images',randImage(imageArr)));
    //res.send(path.join(__dirname,'images',res.imagefile));
    //res.end();
});


const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000

app.listen ( PORT, ()=>{
    console.info( `Application started at port ${PORT} at ${new Date()}`);
})
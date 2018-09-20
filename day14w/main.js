const path = require ('path');
const bodyParser = require ('body-parser');
const express = require ('express');

const cart = [];
cart.push({
    name: "username",
    content: ['item0','item1','item2','item3','item4'],
    saved: new Date()});
cart.push(    {name: "username2",
content: ['item5','item6','item7','item8','item9'],
saved: new Date()});

app = express();

app.get('/api/cart',(req,res)=>{
    res.status(201);
    res.type('application/json');
    console.log(cart);
    const n = cart.find(x => x.name === req.query.name);
    //console.log(cart.some(x => x.name === req.query.name));
    if (n){res.json(n);}
    else {res.status(204).end();}
    //res.json(n);
    /*res.format({
        'application/json':()=>{

        },
        'default': ()=>{
            res.status(406).end;
        }
    })*/
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/api/cart', (req,res)=>{
    const APPcart = {name: req.body.name, content: req.body.content, saved: new Date()};
    
    if(APPcart.content && APPcart.content.length > 0 ){
        var cartIndex = cart.find(x => x.name === APPcart.name);
        //console.log('no error' , cartIndex);
       // console.log ('APPcart is ' , typeof APPcart, '; cartIndex is ', typeof cartIndex);
        if(cartIndex){
            //cartIndex = APPcart;
            cartIndex.content = APPcart.content;
            cartIndex.saved = APPcart.saved;
            res.status(202);
            res.send('item modified');
        }else{
            cart.push(APPcart);
            res.status(201);
            res.send('item added');
        }
        //res.end();
    }else{
        res.status(409);
        res.end();
    }
//console.log(cart);
})





const PORT = parseInt(process.argv[2]) || 
            parseInt(process.env.APP_PORT) | 3000

app.listen(PORT, ()=>{
    console.info(`Application started on ${PORT} on ${new Date()}`);
})
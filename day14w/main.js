const path = require ('path');
const bodyParser = require ('body-parser');
const express = require ('express');

var cart = [];
/*cart.push({
    name: "username",
    content: ['item0','item1','item2','item3','item4'],
    saved: new Date()});
cart.push(    {name: "username2",
content: ['item5','item6','item7','item8','item9'],
saved: new Date()});*/

app = express();

app.get('/api/cart',(req,res)=>{
    res.status(200);
    res.type('application/json');
    //console.log(cart);
    
    const name = req.query.name;

    if(!name){
        res.status.json({error : 'Missing name'})
        return; // return then no need else
    }

    const n = cart.find(x => x.name === req.query.name);
    //console.log(cart.some(x => x.name === req.query.name));
    if (n){
        res.json(n);
   
    } else {
        res.status(204).json({
            name:req.query.name,content:[],saved:''
        });
    }
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
    console.log(req.body);
    const APPcart = {name: req.body.name, content: req.body.content, saved: (new Date()).toString()};
    
    res.type('application/json');
    //console.log(APPcart.content);
    //console.log(APPcart.content.length);
    if(APPcart.content && APPcart.content.length > 0 ){ // need to check if array
        var cartIndex = cart.find(x => x.name === APPcart.name);
        //console.log('no error' , cartIndex);
       // console.log ('APPcart is ' , typeof APPcart, '; cartIndex is ', typeof cartIndex);
       //console.log(cartIndex);
        if(cartIndex){
            //cartIndex = APPcart;
            cartIndex.content = APPcart.content; //...APPcart <-spread operator
            cartIndex.saved = APPcart.saved;
            res.status(202);
            res.json({result: 'modified'});
        }else{
            cart.push(APPcart);
            res.status(201);
            res.json({result: 'added'});
        }
        //res.end();
    }else{
        res.status(409);
        
        res.json({error: 'Cart content is invalid'});
    }
//console.log(cart);
})


app.use(express.static(path.join(__dirname,'ShoppingCart','dist','ShoppingCart')));


const PORT = parseInt(process.argv[2]) || 
            parseInt(process.env.APP_PORT) | 3000

app.listen(PORT, ()=>{
    console.info(`Application started on ${PORT} on ${new Date()}`);
})
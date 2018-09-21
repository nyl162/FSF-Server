const path = require ('path');
const express = require ('express');
const bodyParser = require ('body-parser');
const request = require ('request');
const exphbs = require ('express-handlebars');

const api_key = 'UX6SCEOThAtyekdO9Js2H2XmU2I79tfg'
const delay = 60000;

const app = express();

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

//const db = {};
const qHist = [];

app.post('/',bodyParser.urlencoded(), (req,res)=>{
    const formParams = req.body;
    console.log( '!(formParams.q in qHist) ---> ', !(formParams.q in qHist) );
    console.log('formParams.limit > qHist[formParams.q].limit) --->' , formParams.limit > (qHist[formParams.q]?qHist[formParams.q].limit:0) , '==>', formParams.limit  ,'>', (qHist[formParams.q]?qHist[formParams.q].limit:0));
    console.log('---> compare date --->',(formParams.q in qHist?(new Date().getTime() - qHist[formParams.q].updated.getTime()):-1));
    //if (formParams.q in qHist) {
    if (!(formParams.q in qHist) || parseInt(formParams.limit) > parseInt(qHist[formParams.q]?qHist[formParams.q].limit:0) || (formParams.q in qHist?(new Date().getTime() - qHist[formParams.q].updated.getTime()):-1) > delay) {
    //if (qHist[formParams.q] || formParams.limit > qHist[formParams.q].limit) {
        //param process
        const params = {
            ...formParams,
            api_key
        }

        //new item
      request.get({url: 'http://api.giphy.com/v1/gifs/search',qs: params},
        (err,resp,body) =>{
            if (err) {
                console.err('error:' + err);
                return;
            }
            n = JSON.parse(body)
            //imageList = n.data;
            //console.log(imageList);
            //console.log('>>>>',n.data[0].images.fixed_width.url);
            //console.log(`status code: %d`, resp.statusCode)
           //console.log(n.data.length);
            const qHistdata=[];
            n.data.forEach(x => {
                qHistdata.push(x.images.fixed_width.url);
                //console.log(x.images.fixed_width.url);
            });
            //save history
            console.log(qHistdata);
            qHist[formParams.q] = {        
                ...formParams,
                updated: new Date(),
                history: qHistdata
            } 
            //res.render('main',{layout: false, imageList: qHist[formParams.q].history});
            res.render('main',{layout: false, imageList: n.data, imageList2:[],q:formParams.q,limit:formParams.limit});
            console.log(qHist);
        })
        //qHist.push(db[formParams.q]);
        //console.log(qHist);
        
    }else{
        console.log(qHist[formParams.q].history);
        const imageList2 = [...qHist[formParams.q].history]
        imageList2.splice(formParams.limit);
        res.render('main',{layout: false, imageList: [], imageList2,q:formParams.q,limit:formParams.limit});
    }
    //console.log('---after---', qHist[formParams.q]);
    //res.render('main',{layout: false, imageList: n.data});
//res.render('main',{layout: false, imageList: qHist[formParams.q].history});
})

app.get('/', (req, res)=>{
    res.status(200);
 /*   request.get({url: 'http://api.giphy.com/v1/gifs/search',qs: params},
    (err,resp,body) =>{
        if (err) {
            console.err('error:' + err);
            return;
        }
        n = JSON.parse(body)
        //imageList = n.data;
        //console.log(imageList);
        res.render('main',{layout: false, imageList: n.data});
        console.log('>>>>',n.data[0].images.fixed_width.url);
        //console.log(`status code: %d`, resp.statusCode)
    })*/
    res.render('main',{layout: false});
});

/*
app.use('/',(req,res)=>{
    res.status(200);
    request.get({url: 'http://api.giphy.com/v1/gifs/search',qs: params},
   //request.get('http://api.giphy.com/v1/gifs/search?q=cats&api_key=UX6SCEOThAtyekdO9Js2H2XmU2I79tfg',
    (err,resp,body) =>{
        if (err) {
            console.err('error:' + err);
            return;
        }
        n = JSON.parse(body)
        console.log('>>>>',n.data[0].images.fixed_width.url);
        //console.log(`status code: %d`, resp.statusCode)
    })
    res.send('<h1>Success</h1>');
})
*/

PORT = parseInt(process.argv[2]) 
        || parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, ()=>{
    console.info(`Application started at ${PORT} on ${new Date()}`);
});
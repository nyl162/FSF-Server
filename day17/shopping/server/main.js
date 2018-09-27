require('dotenv').config()
var cors = require('cors')
const express = require ('express');
const path = require ('path');
const bP = require ('body-parser');
const mysql = require ('mysql');

const app = express();

const orderL = [
    'name asc',
    'name desc',
    'brand asc',
    'brand desc'
]

//console.log("DB USER : " + process.env.DB_USER);
//console.log("DB NAME : " + process.env.DB_NAME);
const whitelist = ['http://localhost:3000', 'http://localhost:4200']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONLIMIT
    //debug: true
})

var makeQuery = (sql, pool)=>{
    //console.log(sql);
    
    return  (args)=>{
        let queryPromsie = new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                if(err){
                    reject(err);
                    return;
                }
                //console.log(args);
                
                connection.query(sql, args || [], (err, results)=>{
                    connection.release();
                    if(err){
                        reject(err);
                        return;
                    }
                   // console.log(">>> "+ results);
                    resolve(results); 
                })
            });
        });
        return queryPromsie;
    }
}

//const sqlFindAllFilms = "SELECT * FROM grocery_list limit ? offset ?";
//const sqlFindFilmDetail = "select title, description, release_year from film where film_id = ?";


//var findFilmDetail = makeQuery(sqlFindFilmDetail, pool);
/*findAllFilms().then((results)=>{
    console.log(results);
}).catch((error)=>{
    console.error(error);
});
*/
//app.use(cors(corsOptions));
app.use(cors());

app.post("/grocery",bP.json(),(req,res)=>{ //cors(corsOptions)
    //console.log(req);
    //let qLimit = 50;
    //let qOffset = 0;
    //console.log(req.body);
    let qName = req.body.name? `%${req.body.name}%`: null
    let qBrand = req.body.brand? `%${req.body.brand}%`: null
    let qOrder = orderL[parseInt(req.body.order) || 0];
    let qLimit = parseInt(req.body.limit) || 20;
    let qOffset = parseInt(req.body.offset) || 0;

    const sqlFindGrocery = `SELECT * FROM grocery_list a WHERE a.name like ? or a.brand like ? ORDER BY ${qOrder} limit ? offset ?`;
    var findGrocery = makeQuery(sqlFindGrocery, pool);

    //console.log(parseInt(req.query.order),'-',req.query.order,'-',qOrder);
    findGrocery([qName,qBrand,qLimit,qOffset]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        console.error(error);
    });
   // res.json({result : "success"});
});

app.post("/grocery2",bP.json(),(req,res)=>{ //cors(corsOptions)
    //console.log(req);
    //let qLimit = 50;
    //let qOffset = 0;
    //console.log(req.body);
    let qId = parseInt(req.body.id) || 0;
    console.log(qId);

    const sqlFindGrocery2 = `SELECT * FROM grocery_list a WHERE a.id=?`;
    var findGrocery2 = makeQuery(sqlFindGrocery2, pool);

    //console.log(parseInt(req.query.order),'-',req.query.order,'-',qOrder);
    findGrocery2([qId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        console.error(error);
    });
   // res.json({result : "success"});
});
app.put("/test", (req,res)=>{
console.log(req)
});

app.post("/add",bP.json(),(req,res)=>{ //cors(corsOptions)
    //console.log(req);
    //let qLimit = 50;
    //let qOffset = 0;
    //console.log(req.body);

    let qUPC12 = parseInt(req.body.upc12) || 0;
    let qName = req.body.name? `${req.body.name}`: null
    let qBrand = req.body.brand? `${req.body.brand}`: null

    const sqlFindUnique = `SELECT a.upc12 FROM grocery_list a WHERE a.upc12 = ?`;
    var findUnique = makeQuery(sqlFindUnique, pool);

    const sqlFindUPC = `SELECT * FROM grocery_list a WHERE a.upc12 = ?`;
    var findUPC = makeQuery(sqlFindUPC, pool);

    const sqlAddNew = `INSERT INTO grocery_list (upc12, brand, name) VALUES (?,?,?)`;
    var addNew = makeQuery(sqlAddNew, pool);

    //console.log(parseInt(req.query.order),'-',req.query.order,'-',qOrder);
    findUnique([qUPC12]).then((results)=>{
        console.log(results.length);
        if(results.length<1){
            addNew([qUPC12,qName,qBrand]).then((results)=>{
                res.status(201).json({result:"success",results});
            }).catch((error)=>{
                console.error(error);
            })
        }else{
            findUPC([qUPC12]).then((result2)=>{
            res.status(200).json({result: `Error!! Duplicated UPC12 number found!!`,result2});
            }).catch((error)=>{
                console.error(error);
            })
        }
    }).catch((error)=>{
        console.error(error);
    });
   // res.json({result : "success"});
});


PORT = process.argv[2] || process.env.APP_PORT || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
})
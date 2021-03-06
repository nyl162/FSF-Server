require('dotenv').config()
var cors = require('cors')
const express = require ('express');
const path = require ('path');
const bP = require ('body-parser');
const mysql = require ('mysql');

const app = express();

//console.log("DB USER : " + process.env.DB_USER);
//console.log("DB NAME : " + process.env.DB_NAME);
var whitelist = ['http://localhost:4200', 'http://localhost:4200']
var corsOptions = {
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

const sqlFindAllFilms = "SELECT * FROM film limit ? offset ?";
const sqlFindFilmDetail = "select title, description, release_year from film where film_id = ?";

var findAllFilms = makeQuery(sqlFindAllFilms, pool);
var findFilmDetail = makeQuery(sqlFindFilmDetail, pool);
/*findAllFilms().then((results)=>{
    console.log(results);
}).catch((error)=>{
    console.error(error);
});
*/

app.get("/films",cors(corsOptions),(req,res)=>{
    //console.log(req);
    //let qLimit = 50;
    //let qOffset = 0;
    //console.log(req.query);
    let qLimit = parseInt(req.query.limit) || 50;
    let qOffset = parseInt(req.query.offset) || 0;
    findAllFilms([qLimit,qOffset]).then((results)=>{
        let n = []
        results.forEach((x)=>{
            n.push({title: x.title, url: `/film/${x.film_id}`})
        })
        res.json(n);
    }).catch((error)=>{
        console.error(error);
    });
   // res.json({result : "success"});
});

app.get('/film/:filmID',(req,res)=>{ //cors(corsOptions)
    //console.log(req.params);
    findFilmDetail([req.params.filmID]).then((results)=>{
        //console.log(results.length);
        if (results.length < 1) {res.status(204);}
        res.json(results);
    }).catch((error)=>{
        console.error(error);
    });
    //res.status(202).end();
});


PORT = process.argv[2] || process.env.APP_PORT || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
})

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const conn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database : 'signup'
});

conn.connect((error)=>{
     if(error)
     {
          console.log(error);
     }
     else
     {
          console.log('connection established');
     }
})

app.post('/login', (req, res)=>{
     conn.query(`SELECT * FROM login WHERE email='${req.body.email}'` , (err, result)=>{
          if(err) {
               res.status(500).send(err);
               return;
          }
          res.json(result);
     })
     
})

app.listen(3006, ()=>{
     console.log("listening on");
});

// app.get('/api/


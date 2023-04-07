const express = require('express');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const port = 3000;
const optionBDD = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'todolist'
}

app.use(myConnection(mysql, optionBDD, 'pool'));
app.use(express.static('public')); //definition des resources static
app.set('views', './IHM'); //definition du chemin de mes views
app.set('view engine', 'ejs'); // definition du moteur de views

app.get('/', (req, res)=>{
  req.getConnection((error, connection)=>{
    if (error) {
      console.error(error);
    } else {
      connection.query('SELECT * FROM liste', [], (error, data)=>{
        if (error) {
          console.error(error);
        } else {
          res.status(200).render('index', {data})
        }
      })
    }
  })
});

app.get('/a-propos', (req, res)=>{
  res.status(200).render('apropos')
});

app.use((req, res)=>{
  res.status(404).render('pageintrouvable')
});

app.listen(port, ()=>{
  console.log("Server listening on port " + port);
});
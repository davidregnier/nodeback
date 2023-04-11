const express = require('express');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const port = 8080;
const optionBDD = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'todolist'
}

app.use(bodyParser.urlencoded({extended: true}));
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

app.post('/ajouter-tache', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  req.getConnection((error, connection) => {
    if (error) {
      console.error(error);
    } else {
      connection.query('INSERT INTO liste SET ?', { title, description }, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          res.redirect('/');
        }
      });
    }
  });
});

app.post('/supprimer-tache/:id', (req, res) => {
  const id = req.params.id;
  req.getConnection((error, connection) => {
    if (error) {
      console.error(error);
    } else {
      connection.query('DELETE FROM liste WHERE id = ?', [id], (error, result) => {
        if (error) {
          console.error(error);
        } else {
          res.redirect('/');
        }
      });
    }
  });
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



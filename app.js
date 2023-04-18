const express = require('express');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');
const port = 8080;
const listeRoutes = require('./routes/listeRoutes');
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
app.use(listeRoutes);// j'utilise le component d'accés aux données pour liste


app.get('/a-propos', (req, res) => {
  res.status(200).render('apropos')
});

app.use((req, res) => {
  res.status(404).render('pageintrouvable')
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

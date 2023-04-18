const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.error(error);
            res.status(500).render('erreur', {error})
        } else {
            connection.query('SELECT * FROM liste', [], (error, data) => {
                if (error) {
                    console.error(error);
                } else {
                    res.status(200).render('index', {
                        data
                    })
                }
            })
        }
    })
});

router.post('/ajouter-tache', (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let requeteSQL = id === null ? 'INSERT INTO liste(title, description) VALUES(?, ?)' : 'UPDATE liste SET title = ?, description = ? WHERE ID = ? ;'
    let data = id === null ? [title, description] : [title, description, id]
    req.getConnection((error, connection) => {
        if (error) {
            console.error(error);
            res.status(500).render('erreur', {error})
        } else {
            connection.query(requeteSQL,
                data,
                (error, result) => {
                    if (error) {
                        console.error(error);
                    } else {
                        res.status(302).redirect('/');
                    }
                });
        }
    });
});

router.delete('/ajouter-tache/:id', (req, res) => {
    let id = req.params.id;
    req.getConnection((error, connection) => {
        if (error) {
            console.error(error);
            res.status(500).render('erreur', {error})
        } else {
            connection.query('DELETE FROM liste WHERE id = ?', [id], (error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    res.status(200).json({
                        routeRacine: '/'
                    })
                }
            });
        }
    });
});

module.exports = router; 
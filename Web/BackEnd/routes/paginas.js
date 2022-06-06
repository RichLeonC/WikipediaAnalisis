const express = require('express');
const router = express.Router();
const mysqlConexion = require("../conexionMySQL");
const natural = require('natural')
router.get('/', (req, res) => { //req es request
    mysqlConexion.query('select * from Pagina', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/:pagina', (req, res) => {
    const { pagina } = req.params;; //Quiero el correo que proviene como parametro en la url


    mysqlConexion.query('select sum(Pagina.cantidadRe) as cantidad from Pagina where Pagina.numeroPagina = ?', [pagina],
        (error, rows, fields) => {
            if (!error) {
                res.json(rows[0]);
            } else {
                console.log(error);
            }
        });
})

router.get('/:palabras/:1', (req, res) => { //req es request
    let { palabras } = req.params;
    let arrayP = palabras.split(" ");
    let palabrasStemming = [];
    let jsons = [];
    try {
        arrayP.forEach(p=>palabrasStemming.push(natural.PorterStemmer.stem(p)));

        mysqlConexion.query('select * from Pagina where palabra = ? or palabra = ? or palabra = ?', 
        [palabrasStemming[0],palabrasStemming[1],palabrasStemming[2]], (error, rows, fields) => {
            if (!error) {
                res.json(rows);

            } else {
                console.log(error);
            }

        })
    } catch (e) {
        console.log(e);
    }



});


module.exports = router;


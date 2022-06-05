const express = require('express');
const router = express.Router();
const mysqlConexion = require("../conexionMySQL");
let i = 0;
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
    let jsons = [];

    console.log(arrayP);
    arrayP.forEach(palabra => {
         mysqlConexion.query('select * from Pagina where palabra = ?', [palabra], (error, rows, fields) => {
            if (!error) {
                let filas = Object.values(JSON.parse(JSON.stringify(rows)));
                filas.forEach(row => {
                    jsons = jsons.concat(row);
                })
               //res.set('rows',jsons);
                //console.log(res.get('rows'));
                res.json(jsons);
               
            } else {
                console.log(error);
            }
        });
       
    })
   // console.log(res.get('rows'));
   // jsons.forEach(v=>alert("holaa"));
   // res.json(jsons);
   


});


module.exports = router;


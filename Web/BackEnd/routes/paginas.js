const express = require('express');
const router = express.Router();
const mySqlConexion = require("../conexionMySQL");
const natural = require('natural');



router.get('/', (req, res) => { //req es request
    mySqlConexion.query('select * from Pagina', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});


// router.get('/:pagina/:3', (req, res) => {
//     const { pagina } = req.params;; //Quiero el correo que proviene como parametro en la url
//     mySqlConexion.query('select sum(Pagina.cantidadRe) as cantidad from Pagina where Pagina.numeroPagina = ?',[pagina],
//     (error,rows,fields)=>{
//         if(!error){
//             res.json(rows[0]);
//         }else{
//             console.log(error);
//         }
//     });
// });

    
router.get('/2',(req,res)=>{ //req es request
    
    mySqlConexion.query('select * from EstadisticaGeneral',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});




router.get('/:palabras/:1', (req, res) => { //req es request
    let { palabras } = req.params;
    let arrayP = palabras.split(" ");
    let palabrasStemming = [];
    try {
        arrayP.forEach(p=>palabrasStemming.push(natural.PorterStemmer.stem(p)));

        mySqlConexion.query('select * from Pagina where palabra = ? or palabra = ? or palabra = ?', 
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

    router.get('/all',(req,res)=>{ //req es request
    
        mySqlConexion.query('select * from Pagina order by cantidadRe desc limit 10',(error,rows,fields)=>{
            if(!error){
                res.json(rows);
            }else{
                console.log(error);
            }
        });
    });

});


module.exports = router;


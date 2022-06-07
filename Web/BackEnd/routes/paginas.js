const express = require('express');
const router = express.Router();
const mySqlConexion = require("../conexionMySQL");

router.get('/',(req,res)=>{ //req es request
    mySqlConexion.query('select * from Pagina',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

router.get('/:pagina',(req,res)=>{ 
    const {pagina} = req.params;; //Quiero el correo que proviene como parametro en la url


    mySqlConexion.query('select sum(Pagina.cantidadRe) as cantidad from Pagina where Pagina.numeroPagina = ?',[pagina],
    (error,rows,fields)=>{
        if(!error){
            res.json(rows[0]);
        }else{
            console.log(error);
        }
    });
})
    |
router.get('/:palabras',(req,res)=>{ //req es request
    let {palabras} = req.params;
    
    mySqlConexion.query('select * from Usuario',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

module.exports = router;


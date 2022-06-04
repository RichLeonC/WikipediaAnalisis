const express = require('express');
const router = express.Router();
const mySqlConexion = require("../conexionMySQL");

router.get('/',(req,res)=>{ //req es request
    mysqlConexion.query('select * from Pagina',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

router.get('/:pagina',(req,res)=>{ 
    const {pagina} = req.params;; //Quiero el correo que proviene como parametro en la url


    mysqlConexion.query('select sum(Pagina.cantidadRe) as cantidad from Pagina where Pagina.numeroPagina = ?',[pagina],
    (error,rows,fields)=>{
        if(!error){
            res.json(rows[0]);
        }else{
            console.log(error);
        }
    });
})
    
router.get('/:palabras',(req,res)=>{ //req es request
    let {palabras} = req.params;
    
    mysqlConexion.query('select * from Usuario',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});


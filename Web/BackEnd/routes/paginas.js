const express = require('express');
const router = express.Router();
const mySqlConexion = require("../BackEnd/conexionMySQL");

router.get('/',(req,res)=>{ //req es request
    mysqlConexion.query('select * from Pagina',(error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

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


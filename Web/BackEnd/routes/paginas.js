const express = require('express');
const router = express.Router();
const mysqlConexion= require("./conexionMySQL");

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
    let arrayJson = [];
    let arrayPalabras = palabras.split(" ",",");

    arrayPalabras.forEach(ele=>{
        mysqlConexion.query('select numeroPagina,nombrePagina from Pagina where palabra=?',[ele],(error,rows,fields)=>{
            if(!error){
                arrayJson.push(res.json);
               // res.json(rows);
            }else{
                console.log(error);
            }
        });
    })


});


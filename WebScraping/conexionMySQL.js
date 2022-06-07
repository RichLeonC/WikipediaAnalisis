var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'AnalisisDB',
    user : 'root',
    password : '534444',
});

conexion.connect(error=>{
    if(error){
        console.log('No se pudo realizar la conexion')
        throw error;

    }else{
        console.log('Conexion Exitosa');
    }

})

module.exports = conexion;
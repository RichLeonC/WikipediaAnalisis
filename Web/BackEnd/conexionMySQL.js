var mysql = require('mysql');
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'AnalisisDB',
    user : 'root',
    password : 'cmp250230',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});
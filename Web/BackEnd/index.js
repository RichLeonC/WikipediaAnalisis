const express = require('express');
const morgan = require('morgan');
const mysql= require("./conexionMySQL");
const app = express();
const paginaRoute = require("./routes/paginas");

//Settings
app.set('port',process.env.PORT || 3001);//Setea una variable port, el cual es la que nos puede proveer un SO, caso contrario puerto 3001

//Middlewares
app.use(express.json());
app.use(morgan("common"));

//Routes

app.use("/paginas",paginaRoute);

//Starting the server 
app.listen(app.get('port'),()=>{ //Va abrir el server en el puerto 3001
    console.log('Server on port',app.get('port'));
    console.log(mysql);
})


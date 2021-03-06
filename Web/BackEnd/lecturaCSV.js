const mySqlConexion = require("../BackEnd/conexionMySQL");


const csv = require('csv-parser');
const fs = require('fs');

const insertar=(titulo,num,palabra)=>{
    const query = `insert into Pagina values(?,?,?,?)`;
    random = Math.random()*25;
    mySqlConexion.query(query,[num,titulo,palabra,random],(error,rows,fields)=>{
       // console.log(titulo,num,palabra);
        if(!error){
            status:'Palabra agregada'
        }
        else{
            console.log(error);
            return false;
        }
    })
}
let array = [];
let titulo = [];
let num = 1;
let sinDuplicados = [];
let random = 0;



fs.createReadStream('./wikiviky.csv')
  .pipe(csv())
  .on('data', (row) => {
     
    
    array = row.Column4.split(",");
    titulo = row.Column1.split(",");
    sinDuplicados = array.filter((item,index)=>{
        return array.indexOf(item) === index;
    })
    
    sinDuplicados.forEach(e=>insertar(titulo[0],num,e,random));
    num++;
    random = 0;
    
    array = [];
    titulo = [];
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

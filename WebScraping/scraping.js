const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
//const writeStream =  fs.createWriteStream('wikiviky.csv'); // creacion del archivo


async function inicio(){
const $ =  await  request ({// estas lineas de codigo son para trasformar la pagina en un objeto 
    uri: 'https://en.wikipedia.org/wiki/Web_scraping', // funcion de cheerio para escaneo de pagina web
    transform :body => cheerio.load(body) //html que se toma de la pagina
}) // petición al sitio web que se le queiere hacer web scraping

console.log($);



}
inicio();

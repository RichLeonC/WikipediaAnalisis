const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');

//Funcion encarga de recorrer todos los links de la pagina pasada por parametro
export default function spider(paginaMadre){
    const $ = await request({// estas lineas de codigo son para trasformar la pagina en un objeto 
        uri: 'https://en.wikipedia.org/wiki/Special:AllPages?from=a&to=&namespace=0', // funcion de cheerio para escaneo de pagina web
        transform: body => cheerio.load(body) //html que se toma de la pagina
    }) // petición al sitio web que se le queiere hacer web scraping

    let links = [];

   // $('#content').find('a')

}
 
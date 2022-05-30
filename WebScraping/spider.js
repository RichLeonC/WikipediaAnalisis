const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');

//Funcion encarga de recorrer todos los links de la pagina pasada por parametro
module.exports = async function spider(paginaMadre){
    const $ = await request({
        uri: paginaMadre, 
        transform: body => cheerio.load(body) 
    }) 

    let links = [];

    $('ul[class="mw-allpages-chunk"]').find('a').each((i,el)=>links.push($(el).attr('href'))); //encontramos todos los links que hay en la pagina
    return new Promise(function(res,rej){
        res(links);
    })
      

}


 
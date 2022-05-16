const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
//var natural = require("natural");
//const writeStream =  fs.createWriteStream('wikiviky.csv'); // creacion del archivo


async function inicio(){
const $ =  await  request ({// estas lineas de codigo son para trasformar la pagina en un objeto 
    uri: 'https://en.wikipedia.org/wiki/Web_scraping', // funcion de cheerio para escaneo de pagina web
    transform :body => cheerio.load(body) //html que se toma de la pagina
}) // petición al sitio web que se le queiere hacer web scraping

//console.log($);

// const titulo =  $('Title').text();
 //console.log($('div').find("h2").html());
 let titulos = [];
$("h1").each((i,el)=>{
    // var titulos = $(el).find('h2').text();
    //  console.log($(el).text().replace('[edit]',""));
     titulos.push($(el).text().replace('[edit]',""));
 })
$("h2").each((i,el)=>{
   // var titulos = $(el).find('h2').text();
    // console.log($(el).text().replace('[edit]',""));
    titulos.push($(el).text().replace('[edit]',""));
})

titulos.forEach(element => {
    console.log(element);
});


// natural.PorterStemmer.attach();
// console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
// console.log("chainsaws".stem());


}
inicio();

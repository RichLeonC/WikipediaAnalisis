const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
//var natural = require("natural");
const writeStream =  fs.createWriteStream('wikiviky.csv'); // creacion del archivo


async function inicio(){
const $ =  await  request ({// estas lineas de codigo son para trasformar la pagina en un objeto 
    uri: 'https://en.wikipedia.org/wiki/Web_scraping', // funcion de cheerio para escaneo de pagina web
    transform :body => cheerio.load(body) //html que se toma de la pagina
}) // petición al sitio web que se le queiere hacer web scraping


 //console.log($('div').find("h2").html());
let titulos = [];

const titulo = $('title');



//Obtienes todos los titulos y subtitulos, y los agrega al arreglo
$('#content').find('h1').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
$('#content').find('h2').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
$('#content').find('h3').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
$('#content').find('h4').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
$('#content').find('h5').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
$('#content').find('h6').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))

//console.log(titulos);

writeStream.write('titulos|parrafos⧵n');


const texto = $('.mw-parser-output ').find('p').text();
const lis = $('.div-col').find('ul');
const tags = $('.mw-parser-output .div-col').find('ul');
//console.log(texto.text());
//console.log(texto);




var natural = require('natural');
var tokenizer = new natural.WordTokenizer(); 
var tokens = tokenizer.tokenize(texto); 
stemming = []
tokens.forEach(el  =>{
    if ((el.length>3) && isNaN(el)){
    stemming.push(natural.PorterStemmer.stem(el));}
}) 
writeStream.write(`${stemming}`);

console.log(stemming);

//console.log("I can see that we are going to be friends".tokenizeAndStem());



// natural.PorterStemmer.attach();
// console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
// console.log("chainsaws".stem());

}



inicio();


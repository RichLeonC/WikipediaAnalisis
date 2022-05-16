const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');// incluir herramienta para poder crear archivos de excel para guardar datos
const writeStream =  fs.createWriteStream('quotes.csv'); // creacion del archivo

async function inicio(){

 const $ =  await  request ({// estas lineas de codigo son para trasformar la pagina en un objeto 
     uri: 'https://quotes.toscrape.com/', // funcion de cheerio para escaneo de pagina web
     transform :body => cheerio.load(body) //html que se toma de la pagina
 }) // petición al sitio web que se le queiere hacer web scraping

 const websidetitle = $('title');// como html son etiquetas y en $ está todo la info de la pagina 
 //solo es necesario especificar que se se quiere guardar del side 
console.log(websidetitle.html());// esto muestra por consola el titulo del web side elegido
console.log($('h1').html());// tambien esto extrae el codigo entero 
console.log($('h1').text().trim());// esto hace que se tome el texto nada mas y el trim 
// es una función de js que tienen los strings para borrar el esapaciado

const quote = $ ('.quote').find('a');// al inspecionar la página con la herramienta  podemos sacar la etiqueta que deseamos
console.log(quote.html());// devuelve todas las etiquetas a que encuentra en la cita

const tercera_cita = $('.quote').next().next();
//console.log(tercera_cita.html());
const container = $('.row .col-md-8').parent().next();// extraer toda un sección con el metodo padre, que se fija en
// las etiquetas que engloban la sección y pasa a la siguiente con next
//console.log(container.html());
const container1 = $('.row .col-md-8').children();
//console.log(container1.html());

 const  citas = $('.quote span.text').each((i, el)=>{
   // console.log(i,$(el).text())
   const texto = $(el).text();
   const cita = texto.replace(/(˄⧵“|⧵”$)/g,"");// sintaxis de js es por cada string que lea le quita esos simbolos
   console.log(cita);
}); // metodo para desplegar y guardar varias etiquetas a la vez
//console.log (citas.html());
  

writeStream.write('Quote|Author|Tags⧵n');//estructura que lleva el archivo separado por columnas

$('.quote').each((i,el)=>{
    const tags = [];
    const texto =$(el).find('span.text').text().replace(/(^\“|\”$)/g, "");
    const autor = $(el).find('span small.author').text();
    $(el).find('.tags a.tag').each((i,el)=>(  tags.push($(el).text())));
    writeStream.write(`${texto}|${autor}|${tags}\n`);// llena el archivo con la información 
}
)

}
 inicio ();
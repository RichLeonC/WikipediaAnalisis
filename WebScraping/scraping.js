const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
var natural = require('natural');
const { attr } = require("cheerio/lib/api/attributes");
const { find } = require("lodash");
const writeStream = fs.createWriteStream('wikiviky.csv'); // creacion del archivo
var tokenizer = new natural.WordTokenizer();

//Funcion que se encarga de obtener todos los titulos de la pagina indicada por parametro
function obtenerTitulos($){
    let titulosF = [];
    etiquetas = ['h1','h2'];
    for(e in etiquetas){
        $('#content').find(etiquetas[e]).each((i, el) => (titulosF.push($(el).text().replace('[edit]', ''))))
    } 

    return titulosF;
}
//Funcion que se encarga de obtener todos los subtitulos de la pagina indicada por parametro
function obtenerSubTitulos($){
    let subtitulosF = [];
    etiquetas = ['h3','h4','h5','h6'];
    for(e in etiquetas){
        $('#content').find(etiquetas[e]).each((i, el) => (subtitulosF.push($(el).text().replace('[edit]', ''))))
    } 

    return subtitulosF;
}


//Funcion que se encarga de obtener los titulos o subitulos y aplicarles stemming, de la pagina recibida por parametro

function stemmingTitulosSub(array){
    let subTitulosStemming = [];
    let tokenUnido = '';
    array.forEach(subtitulo=>{
        let tokens = tokenizer.tokenize(subtitulo);
        tokens.forEach(token=>{
            tokenUnido+=natural.PorterStemmer.stem(token).concat(" ");
            
        })
        subTitulosStemming.push(tokenUnido);
        tokenUnido='';
    })
    return subTitulosStemming;
}

//Funcion que se encarga de obtener todas las palabras que hay en los parrafos de toda la pagina
function obtenerParrafos($){
    const texto = $('.mw-parser-output ').find('p').text();
    const lis = $('.div-col').find('ul').text();
    var tokes = tokenizer.tokenize(texto+lis);
    return tokes;
}

//Pasa el stemming a todas las palabras
function obtenerParrafosStemming(tokens){
    stemming = []
    tokens.forEach(el => {
        if ((el.length > 3) && isNaN(el)) {
            stemming.push(natural.PorterStemmer.stem(el));
        }
    })
    return stemming;
}

//Retorna los titulos con stemming
function obtenerTitulosStemming($){
    const titulos = obtenerTitulos($);
    return stemmingTitulosSub(titulos);
}

//Retorna los subtitulos con stemming
function obtenerSubTitulosStemming($){
    const subtitulos = obtenerSubTitulos($);
    return stemmingTitulosSub(subtitulos);
}

function obtenerReferencias($){
    const referencias =  $('.mw-parser-output .reflist reflist-columns references-column-width').find('ol').text();
    return referencias;

}

//Obtiene los src,alt de las imagenes de la pagina
function obtenerImagenes($,filtro){
    const sources = [];
    const alts = [];
    const datos = [];

    $('div[class="thumbinner"]').find('img').each((i,el)=>{
        datos.push($(el).attr(filtro))
    })

    return datos;

}

async function inicio() {
    const $ = await request({// estas lineas de codigo son para trasformar la pagina en un objeto 
        uri: 'https://en.wikipedia.org/wiki/Ludwig_van_Beethoven', // funcion de cheerio para escaneo de pagina web
        transform: body => cheerio.load(body) //html que se toma de la pagina
    }) // petición al sitio web que se le queiere hacer web scraping

    let titulos = [];
    let titulosStemming=[];
    let subtitulos = [];
    let subTitulosStemming=[];
    let palabrasParrafoStemming = [];
    let srcImgs = [];
    let altImgs = [];
    let altImgsStemming = [];
    writeStream.write('Titulos|Subtitulos|Parrafos|ParrafosStemming|TitulosStemming|SubTitulosStemming\n');
    //Obtiene todos los titulos y subtitulos
    titulos = obtenerTitulos($);
    subtitulos = obtenerSubTitulos($);
    titulosStemming = obtenerTitulosStemming($);
    subTitulosStemming = obtenerSubTitulosStemming($);

    //obtener todo el texto de la página
    const texto = obtenerParrafos($);
    palabrasParrafoStemming = obtenerParrafosStemming(texto);
    
    src = obtenerImagenes($,'src');
    altImgs = obtenerImagenes($,'alt');

    console.log(srcImgs);
    console.log(altImgs);
    

    writeStream.write(`${titulos}|${subtitulos}|${texto}|${palabrasParrafoStemming}|${titulosStemming}|${subTitulosStemming}`);
  
   
}

inicio();


const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
//var natural = require("natural");
var natural = require('natural');
const writeStream = fs.createWriteStream('wikiviky.csv'); // creacion del archivo

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

//Funcion que se encarga de obtener los titulos y subitulos y aplicarles stemming, de la pagina recibida por parametro
function obtenerTitulosStemming($){
    const titulos = obtenerTitulos($);
    let titulosStemming = [];
    let tokenUnido = '';
    let tokenizer = new natural.WordTokenizer();
    titulos.forEach(titulo=>{
        let tokens = tokenizer.tokenize(titulo);
        tokens.forEach(token=>{
            tokenUnido+=natural.PorterStemmer.stem(token).concat(" ");
            
        })
        titulosStemming.push(tokenUnido);
        tokenUnido='';
    })
    return titulosStemming;
}

function obtenerSubTitulosStemming($){
    const subtitulos = obtenerSubTitulos($);
    let subTitulosStemming = [];
    let tokenUnido = '';
    let tokenizer = new natural.WordTokenizer();
    subtitulos.forEach(subtitulo=>{
        let tokens = tokenizer.tokenize(subtitulo);
        tokens.forEach(token=>{
            tokenUnido+=natural.PorterStemmer.stem(token).concat(" ");
            
        })
        subTitulosStemming.push(tokenUnido);
        tokenUnido='';
    })
    return subTitulosStemming;
}

async function inicio() {
    const $ = await request({// estas lineas de codigo son para trasformar la pagina en un objeto 
        uri: 'https://en.wikipedia.org/wiki/Web_scraping', // funcion de cheerio para escaneo de pagina web
        transform: body => cheerio.load(body) //html que se toma de la pagina
    }) // petición al sitio web que se le queiere hacer web scraping

    let titulos = [];
    let titulosStemming=[];
    let subtitulos = [];
    let subTitulosStemming=[];
    writeStream.write('Titulos|Subtitulos|Parrafos|TitulosStemming|SubTitulosStemming\n');
    //Obtiene todos los titulos y subtitulos
    titulos = obtenerTitulos($);
    subtitulos = obtenerSubTitulos($);
    titulosStemming = obtenerTitulosStemming($);
    subTitulosStemming = obtenerSubTitulosStemming($);

    const texto = $('.mw-parser-output ').find('p').text();
    const lis = $('.div-col').find('ul');
    const tags = $('.mw-parser-output .div-col').find('ul');

    var tokenizer = new natural.WordTokenizer();
    var tokens = tokenizer.tokenize(texto);
    stemming = []
    tokens.forEach(el => {
        if ((el.length > 3) && isNaN(el)) {
            stemming.push(natural.PorterStemmer.stem(el));
        }
    })
    // writeStream.write(`${stemming}`);
    writeStream.write(`${titulos}|${subtitulos}|${stemming}|${titulosStemming}|${subTitulosStemming}`);
    console.log(stemming);

    //console.log("I can see that we are going to be friends".tokenizeAndStem());



    // natural.PorterStemmer.attach();
    // console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
    // console.log("chainsaws".stem());

}

inicio();


const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
var natural = require('natural');
const { attr } = require("cheerio/lib/api/attributes");
const { find, random } = require("lodash");
const { index } = require("cheerio/lib/api/traversing");
const writeStream = fs.createWriteStream('wikiviky.csv'); // creacion del archivo
var tokenizer = new natural.WordTokenizer();
const spider = require("./spider.js");
const modulePagMadres = require("./pagMadres.js")
const mySqlConexion = require('./conexionMySQL.js')

//Funcion que se encarga de obtener todos los titulos de la pagina indicada por parametro
function obtenerTitulos($) {
    let titulosF = [];
    etiquetas = ['h1', 'h2'];
    for (e in etiquetas) {
        $('#content').find(etiquetas[e]).each((i, el) => (titulosF.push($(el).text().replace('[edit]', ''))))
    }

    return titulosF;
}
//Funcion que se encarga de obtener todos los subtitulos de la pagina indicada por parametro
function obtenerSubTitulos($) {
    let subtitulosF = [];
    etiquetas = ['h3', 'h4', 'h5', 'h6'];
    for (e in etiquetas) {
        $('#content').find(etiquetas[e]).each((i, el) => (subtitulosF.push($(el).text().replace('[edit]', ''))))
    }

    return subtitulosF;
}


//Funcion que se encarga de obtener los titulos o subitulos y aplicarles stemming, de la pagina recibida por parametro

function stemmingTitulosSub(array) {

    let subTitulosStemming = [];
    try {
        let tokenUnido = '';
        array.forEach(subtitulo => {
            let tokens = tokenizer.tokenize(subtitulo);
            tokens.forEach(token => {
                tokenUnido += natural.PorterStemmer.stem(token).concat(" ");

            })
            subTitulosStemming.push(tokenUnido);
            tokenUnido = '';
        })
    } catch (e) {

    }
    return subTitulosStemming;
}

function obtenerParrafos($) {
    const texto = $('.mw-parser-output ').find('p').text();
    const lis = $('.div-col').find('ul').text();
    var tokes = tokenizer.tokenize(texto + lis);
    return tokes;
}

function obtenerParrafosStemming(tokens) {
    stemming = []
    tokens.forEach(el => {
        if ((el.length > 3) && isNaN(el)) {
            stemming.push(natural.PorterStemmer.stem(el));
        }
    })
    return stemming;
}

//Retorna los titulos con stemming
function obtenerTitulosStemming($) {
    const titulos = obtenerTitulos($);
    return stemmingTitulosSub(titulos);
}

//Retorna los subtitulos con stemming
function obtenerSubTitulosStemming($) {
    const subtitulos = obtenerSubTitulos($);
    return stemmingTitulosSub(subtitulos);
}

//funci??n que obtiene las referencias de la p??gina
function obtenerReferencias($) {
    const ReferenciasSe = [];
    $('.mw-parser-output .reflist').each((i, el) => ReferenciasSe.push($(el).text().replace(/(\r\n|\n|\r)/g, "").replace('|', "")));
    return ReferenciasSe;

}

//obtiene todos los links que se encuentran el p??gina
function obtenerLiks($) {
    const links = []
    $('.mw-parser-output ul li a ').each((i, el) => links.push($(el).attr('href'))).text();

    return links;

}


function obtenerAutores($) {
    const autores = $('div[class="navbox authority-control"]').find('ul').text();
    var tokes = tokenizer.tokenize(autores);
    limpios = []
    tokes.forEach(el => {
        if (isNaN(el)) {
            limpios.push(el);
        }
    })
    return limpios;

}


//Obtiene los src's o alts de las imagenes y los retorna.
function obtenerImagenes($, filtro) {
    let datos = []
    $('#content').find('img').each((i, el) => {
        datos.push($(el).attr(filtro))
    })
    return datos;

}

const insertar = (titulo, num, palabra) => {
    const query = `insert into Pagina values(?,?,?,?)`;
    let random = Math.random()*20;
    mySqlConexion.query(query, [num, titulo, palabra, random], (error, rows, fields) => {
        // console.log(titulo,num,palabra);
        if (!error) {
            status: 'Palabra agregada'
        }
        else {
            console.log(error);
            return false;
        }
    })
}

async function inicio() {
    writeStream.write('Titulos|Subtitulos|Parrafos|ParrafosStemming|TitulosStemming|SubTitulosStemming|SrcImgs|AltImgs|AltImgsStemming|Autores|Referencias|Links\n');
    let pagMadres = modulePagMadres.pagMadres;
    let numPagina = 1;
    console.log(pagMadres.length);
    for (let i = 0; i < pagMadres.length; i++) {
        console.log("pag:" + i);
        let paginas = await spider(pagMadres[i]);
        for (let j = 0; j < paginas.length; j++) {
            const $ = await request({// estas lineas de codigo son para trasformar la pagina en un objeto 
                uri: "https://en.wikipedia.org" + paginas[j], // funcion de cheerio para escaneo de pagina web
                transform: body => cheerio.load(body), //html que se toma de la pagina

            })
            // .on('response', function(response) {

            // }) // petici??n al sitio web que se le queiere hacer web scraping

            let titulos = [];
            let titulosStemming = [];
            let subtitulos = [];
            let subTitulosStemming = [];
            let palabrasParrafoStemming = [];
            let autores = [];
            let referencias = [];
            let srcImgs = [];
            let altImgs = [];
            let altImgsStemming = [];
            let links = [];

            //Obtiene todos los titulos y subtitulos
            titulos = obtenerTitulos($);
          /*   subtitulos = obtenerSubTitulos($);
            titulosStemming = obtenerTitulosStemming($);
            subTitulosStemming = obtenerSubTitulosStemming($);
            autores = obtenerAutores($);
            referencias = obtenerReferencias($);
            links = obtenerLiks($); */
            //obtener todo el texto de la p??gina
            const texto = obtenerParrafos($);
            palabrasParrafoStemming = obtenerParrafosStemming(texto);

            // srcImgs = obtenerImagenes($, 'src');
            // altImgs = obtenerImagenes($, 'alt');
            // altImgsStemming = stemmingTitulosSub(altImgs);

           // Para llenar el SQL 
            sinDuplicados = palabrasParrafoStemming.filter((item,index)=>{
                return palabrasParrafoStemming.indexOf(item) === index;
            })
            let repetidas = 0;
            for (const p in palabrasParrafoStemming) {
                if(sinDuplicados.includes(palabrasParrafoStemming[p])){
                    repetidas++;
                }
                else{
                    insertar(titulos[0],numPagina,palabrasParrafoStemming[p],repetidas);

                }
            }

            sinDuplicados.forEach(palabra=>{
                insertar(titulos[0],numPagina,palabra,1);
            })

            numPagina++;
           // writeStream.write(`${titulos}|${subtitulos}|${texto}|${palabrasParrafoStemming}|${titulosStemming}|${subTitulosStemming}|${srcImgs}|${altImgs}|${altImgsStemming}|${autores}|${referencias}|${links}\n`);

        }
    }


}


inicio();



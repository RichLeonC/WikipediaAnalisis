const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
//var natural = require("natural");
const writeStream = fs.createWriteStream('wikiviky.csv'); // creacion del archivo


async function inicio() {
    const $ = await request({// estas lineas de codigo son para trasformar la pagina en un objeto 
        uri: 'https://en.wikipedia.org/wiki/Web_scraping', // funcion de cheerio para escaneo de pagina web
        transform: body => cheerio.load(body) //html que se toma de la pagina
    }) // petición al sitio web que se le queiere hacer web scraping

    let titulos = "";

    //Obtiene todos los titulos y subtitulos, y los concantena
    writeStream.write('Titulos|Parrafos\n');

    $('#content').find('h1').each((i, el) => (titulos += $(el).text().replace('[edit]', '').concat("-")))
    $('#content').find('h2').each((i, el) => (titulos += $(el).text().replace('[edit]', '').concat("-")))
    $('#content').find('h3').each((i, el) => (titulos += $(el).text().replace('[edit]', '').concat("-")))
    $('#content').find('h4').each((i, el) => (titulos += $(el).text().replace('[edit]', '').concat("-")))
    $('#content').find('h5').each((i, el) => (titulos += $(el).text().replace('[edit]', '').concat("-")))
    $('#content').find('h6').each((i, el) => (titulos += $(el).text().replace('[edit]', '').concat("-")))


    // $('#content').find('h1').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
    // $('#content').find('h2').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
    // $('#content').find('h3').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
    // $('#content').find('h4').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
    // $('#content').find('h5').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))
    // $('#content').find('h6').each((i,el)=>(titulos.push($(el).text().replace('[edit]',''))))

    writeStream.write(`${titulos}|Este fue mi error`);

    console.log(titulos);





    var natural = require('natural');
    var tokenizer = new natural.WordTokenizer();
    var tokens = tokenizer.tokenize("loves, falls, connecting, opened, ranking, going, living, was, is, am ");
    stemming = []
    tokens.forEach(el => {
        stemming.push(natural.PorterStemmer.stem(el));
    })

    //console.log(stemming);

    //console.log("I can see that we are going to be friends".tokenizeAndStem());



    // natural.PorterStemmer.attach();
    // console.log("i am waking up to the sounds of chainsaws".tokenizeAndStem());
    // console.log("chainsaws".stem());

}



inicio();


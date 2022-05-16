
const cheerio = require("cheerio");// incluir cheerio
const request = require("request-promise"); // incluir respuestas 
const fs = require('fs-extra');
const writeStream =  fs.createWriteStream('wikiviky.csv'); // creacion del archivo
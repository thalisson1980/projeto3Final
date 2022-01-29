//teste
const code = require('./models/DDCCFF');
const db = require('../node-api/bd/ligacao');
const express = require('express');

var XLSX = require("xlsx");
var workbook = XLSX.readFile("lista.xls");
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list); 

sheet_name_list.forEach(function (y) {
    var worksheet = workbook.Sheets[y];
    //getting the complete sheet
    // console.log(worksheet);
  
    var headers = {};
    var data = [];
    for (z in worksheet) {
      if (z[0] === "!") continue;
      //parse out the column, row, and value
      var col = z.substring(0, 1);
      // console.log(col);
  
      var row = parseInt(z.substring(1));
      // console.log(row);
  
      var value = worksheet[z].v;
      // console.log(value);
  
      //store header names
      if (row == 1) {
        headers[col] = value;
        // storing the header names
        continue;
      }
  
      if (!data[row]) data[row] = {};
      data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    console.log(data);

    data.forEach(element => {
        join = [element.descritivo_distrito,element.descritivo_concelho,element.descritivo_freguesia].join();
        trim = join.replace(/\s+/g, ' ').trim()
        var Code = new code({
           code: element.Cod_distrito+ element.cod_concelho+ element.cod_freguesia,
           location: trim
    
       });
       Code.save();
       });
    
  });
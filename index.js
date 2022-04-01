const express = require("express");
const app = express();
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const _lodash = require("lodash");
const chalk = require("chalk");

app.listen(8080, () => {
  console.log("servidor en puerto 8080");
});

// El registro de los usuarios debe hacerse con la API Random User usando axios para
// consultar la data. (2 Puntos)
let arr_usuarios = [];
let arr_consolausuario = [];
let arr_genders = [];

app.get("/usuarios", (req, res) => {
  res.writeHead(200, { "Content-type": "text/html" });
  axios
    .get("https://randomuser.me/api")
    .then((datos) => {
      const { first, last } = datos.data.results[0].name;
                  const gender = [datos.data.results[0].gender];
              
                // Cada usuario registrado debe tener un campo id único generado por el paquete UUID.
                  const id = uuidv4().slice(0,6);
                  // Cada usuario debe tener un campo timestamp almacenando la fecha de registro obtenida y formateada por el paquete Moment.
                  const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
                  arr_usuarios.push({first, last, id, timestamp, gender});
                  arr_consolausuario.push({first, last, id, timestamp});
                  res.write('<ol>');
                  _lodash.forEach(arr_usuarios, (u)=>{
                      res.write(`<li>Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.id} - Timestamp: ${u.timestamp}</li>`);
                  });
                  res.write('</ol>');

                  // Por cada consulta realizada al servidor, se debe devolverle al cliente una lista con los datos de todos los usuarios registrados usando Lodash para dividir el arreglo en 2 separando los usuarios por sexo.
                  arr_genders = _lodash.partition(arr_usuarios, (g) => g.gender === 'female');
                  // CONSOLA
                  // En cada consulta también se debe imprimir por la consola del servidor la misma lista de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
                  _lodash.forEach(arr_consolausuario, (u)=>{
                      console.log(
                          chalk.blue.bgWhite(
                          `Nombre: ${u.first} - Apellido: ${u.last} - ID: ${u.id} - Timestamp: ${u.timestamp}`));
                  });
                  arr_consolausuario.pop();
                  res.end();
              }).catch((e) => {
                  console.log(e);
              });
            });


// 6. El servidor debe ser levantado con el comando Nodemon.

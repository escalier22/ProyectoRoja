// Importamos functions desde firebasebase-funcions
const functions = require('firebase-functions');
// Importamos firebase-admin para conectarnos con la base de datos
const firebase = require('firebase-admin');
// Importamos el archivo de configuración que descargamos
const config = require('./firebase-config.json');
// inicializamos nuestra aplicación
firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: 'https://proyectoroja.firebaseio.com/' // URL de nuestro proyecto
  });


// creamos la función que obtiene los recursos de nuestra firebase database 
exports.api = functions.https.onRequest((req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'GET') {
    const data = firebase.database().ref('/me') // Hacemos referencia a la base de datos
    data.on('value', (snapshot) => {
      res.json(snapshot.val()); // El elemento resultante lo exponemos en un archivo JSON
    });
  }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
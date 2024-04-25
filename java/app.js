const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

// URL do seu banco de dados MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'siteAccessCounter';

// Conecta ao MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
 if (err) throw err;
 const db = client.db(dbName);

 // Cria uma coleção para armazenar os registros de acesso
 const accessCollection = db.collection('access');

 // Rota para registrar o acesso
 app.get('/', (req, res) => {
    // Insere um novo documento na coleção de acesso
    accessCollection.insertOne({ timestamp: new Date() }, (err, result) => {
      if (err) throw err;
      console.log('Acesso registrado');
    });

    // Responde com uma mensagem simples
    res.send('Obrigado por visitar!');
 });

 // Inicia o servidor
 app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
 });
});
// Rota para contar os acessos
app.get('/count', (req, res) => {
    accessCollection.countDocuments({}, (err, count) => {
       if (err) throw err;
       res.send(`Total de acessos: ${count}`);
    });
   });
   
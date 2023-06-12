const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.SERVER_PORT;

//importando as rotas de ./server/routes
//rotas ...


// Define o diretório estático para servir o arquivo index.html
app.use(express.static(__dirname + '/view'));

// Define o diretório estático para servir as dependencias de node modules
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// Define as rotas do servidor ==========================================
// Rota principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view', 'index.html');
});


const chessBoardRouter = require('./server/routes/chessBoard')
app.use('/chessBoard', chessBoardRouter);

const perfilRouter = require('./server/routes/perfil')
app.use('/perfil', perfilRouter);

const configRouter = require('./server/routes/config')
app.use('/config', configRouter);

const userRouter = require('./server/routes/userControl');
app.use('/users', userRouter);



//=================== EXECUÇÃO =========================================================== 
// Inicia o servidor

const banco_senha = encodeURIComponent('dbbvb327904')

mongoose.connect(
  process.env.URL_DB
  ).then(() =>{
      console.log("db connection success!!")
      app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
      });
  })
  .catch((err) => console.log(err))

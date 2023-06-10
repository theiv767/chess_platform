const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

//importando as rotas de ./server/routes
//rotas ...


// Define o diretório estático para servir o arquivo index.html
app.use(express.static(path.join(__dirname, 'view')));

// Define o diretório estático para servir as dependencias de node modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


// Define as rotas do servidor ==========================================
// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});


const chessBoardRouter = require('./server/routes/chessBoard')
app.use('/chessBoard', chessBoardRouter);


//=================== EXECUÇÃO =========================================================== 
// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

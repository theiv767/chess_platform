const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

//importando as rotas
//rotas ...


// Define o diretório estático para servir o arquivo index.html
app.use(express.static(path.join(__dirname, 'view')));

// Define o diretório estático para servir as dependencias de node modules
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


// Define as rotas do servidor ==========================================






//== EXECUÇÃO =========================================================== 
// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

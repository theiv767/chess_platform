const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost'; // Defina o hostname do servidor
const port = 3000; // Defina a porta que o servidor irá ouvir

const server = http.createServer((req, res) => {
  // Obtenha o caminho do arquivo solicitado pelo cliente
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Verifique a extensão do arquivo solicitado
  const extname = path.extname(filePath);

  // Mapeie as extensões de arquivo para os respectivos tipos MIME
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
  };

  // Verifique se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Se o arquivo não existir, retorne um erro 404
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File not found');
    } else {
      // Se o arquivo existir, leia-o e envie seu conteúdo como resposta
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        } else {
          // Verifique o tipo MIME com base na extensão do arquivo
          const contentType = mimeTypes[extname] || 'application/octet-stream';
          res.statusCode = 200;
          res.setHeader('Content-Type', contentType);
          res.end(data);
        }
      });
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
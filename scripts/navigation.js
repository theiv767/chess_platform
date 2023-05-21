const src = document.currentScript.dataset.src;
const element = document.currentScript.dataset.element;
const current = document.currentScript.dataset.current;
console.log(current)
axios.get(src)
      .then(function (response) {
        // Insere o conteúdo da navbar no elemento de contêiner
        document.getElementById(element).innerHTML = response.data;

        if(current == 'home'){
          const linkPerfil = document.getElementById('perfil-link');
          const linkChessboar = document.getElementById('chessBoard-link');
          const linkConfig = document.getElementById('config-link');

          if(linkPerfil){
            linkPerfil.setAttribute('href', 'pages/perfil.html');
          }
          if(linkChessboar){
            linkChessboar.setAttribute('href', 'pages/ChessBoard.html');
          }
          if(linkConfig){
            linkConfig.setAttribute('href', 'pages/config.html');
          }
        }else{
          const currentLink = document.getElementById(current+ '-link');
        
          if(currentLink){
              console.log("aqui: "+currentLink)
              currentLink.classList.add('active');
          }
        }
        

      })
      .catch(function (error) {
        console.error('Error, Get content error:', error);
});

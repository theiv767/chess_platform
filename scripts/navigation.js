var nav = document.currentScript.dataset.nav;
var container = document.currentScript.dataset.navcontainer;
const current = document.currentScript.dataset.current;

axios.get(nav)
  .then((response)=>{
    // Insere o conteúdo da navbar no containero de contêiner
    document.getElementById(container).innerHTML = response.data;

    if (current == 'home') {
      const linkPerfil = document.getElementById('perfil-link');
      const linkChessboar = document.getElementById('chessBoard-link');
      const linkConfig = document.getElementById('config-link');

      if (linkPerfil) {
        linkPerfil.setAttribute('href', 'pages/perfil.html');
      }
      if (linkChessboar) {
        linkChessboar.setAttribute('href', 'pages/ChessBoard.html');
      }
      if (linkConfig) {
        linkConfig.setAttribute('href', 'pages/config.html');
      }
    } else {
      const currentLink = document.getElementById(current + '-link');

      if (currentLink) {
        console.log("aqui: " + currentLink)
        currentLink.classList.add('active');
      }
    }

  })
  .catch((error)=>{
    console.error('Error, Get content error:', error);
  });

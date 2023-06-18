var nav = document.currentScript.dataset.nav;
var container = document.currentScript.dataset.navcontainer;
const current = document.currentScript.dataset.current;

function logOut() {
  localStorage.clear()
  console.log("deslogado")

}

axios.get(nav)
  .then((response) => {
    document.getElementById(container).innerHTML = response.data;

    if (localStorage.getItem('auth_chess_user')) {
      let perfilBtn = document.getElementById("perfilDropdown")
      let linkPerfil = document.getElementById("perfil-link").href = 'perfil'
      let linkChessBoard = document.getElementById("chessBoard-link").href = 'jogar'
      let linkConfig = document.getElementById("config-link").href = 'config'
      var navPerfil = document.getElementById("navPerfil")

      axios.get('http://localhost:3000/pictures/'+localStorage.getItem('id_user'))
        .then(response =>{
            var imgSrc = response.data+''
            console.log("resposta imagem: "+imgSrc)
            console.log(navPerfil)
            navPerfil.src = imgSrc;
        })
      let btnLogout = document.getElementById("logout")
      if (btnLogout) {
        btnLogout.onclick = logOut
      }

    } else {
      let perfilBtn = document.getElementById("perfilDropdown")
      perfilBtn.innerHTML = ''
      let linkPerfil = document.getElementById("perfil-link").href = ''
      let linkChessBoard = document.getElementById("chessBoard-link").href = ''
      let linkConfig = document.getElementById("config-link").href = ''
    }



    if (!(current == 'home')) {
      const currentLink = document.getElementById(current + '-link');

      if (currentLink) {
        currentLink.classList.add('active');
      }
    }

  })
  .catch((error) => {
    console.error('Error, Get content error:', error);
  });



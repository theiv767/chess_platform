// const { default: axios } = require("axios");

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
      console.log(localStorage.getItem('auth_chess_user'))

      let perfilBtn = document.getElementById("perfilDropdown")
      console.log(perfilBtn)


      let btnLogout = document.getElementById("logout")
      if (btnLogout) {
        btnLogout.onclick = logOut
      }

    } else {
      let perfilBtn = document.getElementById("perfilDropdown")
      perfilBtn.innerHTML = ''
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

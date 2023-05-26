var nav = document.currentScript.dataset.nav;
var container = document.currentScript.dataset.navcontainer;
const current = document.currentScript.dataset.current;

axios.get(nav)
  .then((response)=>{
    // Insere o conteúdo da navbar no containero de contêiner
    document.getElementById(container).innerHTML = response.data;

    if (current == 'home') {
      const links = document.getElementsByClassName('link-navigation');

      if(links){
        for(var element of links){
          console.log(element.setAttribute('href', 'pages/'+element.getAttribute("href")))
        }
      }
      

    } else {
      const currentLink = document.getElementById(current + '-link');

      if (currentLink) {
        currentLink.classList.add('active');
      }
    }

  })
  .catch((error)=>{
    console.error('Error, Get content error:', error);
  });

function abrirModal(){
    const modal = document.getElementById('janela-modal')
    modal.classList.add('abrir')
    console.log("buceta")

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'janela-modal'){
            console.log("teste")
            modal.classList.remove('abrir')
        }
    })
}
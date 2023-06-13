const modal = document.getElementById('janela-modal')
const modalRegister = document.getElementById('janela-modal-registro')
modal.classList.add('fechar')
modalRegister.classList.add('fechar')

function abrirModal(){
    modal.classList.replace('fechar','abrir')
}

function logar() {
    modal.classList.replace('abrir','fechar')
    console.log('loguei')

    //fazer os get e post
}

function registrar(){
    modalRegister.classList.replace('abrir','fechar')
    console.log('registrei')

    //fazer os get e post
}


function registroModal(){
    modal.classList.replace('abrir','fechar')
    modalRegister.classList.replace('fechar','abrir')

    console.log('fui pro registro')

}
function loginModal(){
    modalRegister.classList.replace('abrir','fechar')
    modal.classList.replace('fechar','abrir')

    console.log('fui pro login')
}


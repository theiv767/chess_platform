const buscarModal = document.getElementById("buscar-partida")
const buscandoModal = document.getElementById("buscando-partida")
const modalResultado = document.getElementById("modal-partida")

const blackpawn = document.getElementById("resultado-blacl")
const whitepawn = document.getElementById("resultado-white")


buscarModal.classList.add('abrir')
buscandoModal.classList.add('fechar')
modalResultado.classList.add('fechar')

//quando for fazer a condição de abrir a modal coloca isso: modalResultado.classList.replace('fechar','abrir')
function fecharResultado() {
    modalResultado.classList.replace('abrir','fechar')

}

function buscar() {
    buscarModal.classList.replace('abrir','fechar')
    buscandoModal.classList.replace('fechar','abrir')

}

function cancelarBusca() {
    buscandoModal.classList.replace('abrir','fechar')
    buscarModal.classList.replace('fechar','abrir')

}
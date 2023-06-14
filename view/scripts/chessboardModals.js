const buscarModal = document.getElementById("buscar-partida")
const buscandoModal = document.getElementById("buscando-partida")

buscarModal.classList.add('abrir')
buscandoModal.classList.add('fechar')


function buscar() {
    buscarModal.classList.replace('abrir','fechar')
    buscandoModal.classList.replace('fechar','abrir')

}

function cancelarBusca() {
    buscandoModal.classList.replace('abrir','fechar')
    buscarModal.classList.replace('fechar','abrir')

}
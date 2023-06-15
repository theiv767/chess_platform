var timeoutId; // Variável para armazenar o ID do timeout
var currentMinutos = "minutos-jogador"
var currentSegundos = "segundos-jogador"


// CREATE CONTAGEM DE TEMPO REGRESSIVA
function contagemRegressiva(idMinutos, idSegundos) {
    var minutosElemento = document.getElementById(idMinutos);
    var segundosElemento = document.getElementById(idSegundos);
  
    var minutos = parseInt(minutosElemento.innerText);
    var segundos = parseInt(segundosElemento.innerText);
  
    if (segundos > 0) {
      segundos--;
    } else {
      if (minutos > 0) {
        minutos--;
        segundos = 59;
      } else {
        // A contagem regressiva terminou
        return;
      }
    }
  
    minutosElemento.innerText = minutos.toString().padStart(2, "0");
    segundosElemento.innerText = segundos.toString().padStart(2, "0");
  
    // Chamar a função novamente após 1 segundo
    timeoutId = setTimeout(function() {
      contagemRegressiva(idMinutos, idSegundos);
    }, 1000);
}
  
  // Interromper a contagem regressiva
function interromperContagemRegressiva() {
   clearTimeout(timeoutId);
}

document.getElementById("minutos-jogador").innerText = "03";
document.getElementById("segundos-jogador").innerText = "00";
document.getElementById("minutos-adversario").innerText = "03";
document.getElementById("segundos-adversario").innerText = "00";

var buscarBtn = document.getElementById("modalBuscarBtn")

//iniciando contagem regressiva
buscarBtn.onclick = function(){
    contagemRegressiva(currentMinutos, currentSegundos);

}




function startGlow(div) { 
    div.style.backgroundColor = "#19A7CE";
    div.style.boxShadow = "0 0 5px 1px #19A7CE";
 
}

function stopGlow(div) {
  div.style.backgroundColor = "";
  div.style.boxShadow = ""
}



// ======= CLIQUES DO TABULEIRO ==================================================
function squareOnClick(col) {
    var id = col.id;
    axios.post('http://localhost:3000/jogar/squareOnClick', { id })
    .then(response => {
      console.log(response.data);
      
      if(response.data.canMov){
        var div = document.getElementById(response.data.idToMov)
        col.innerHTML = div.innerHTML
        div.innerHTML = ''
        stopGlow(div)
        stopGlow(col)
        interromperContagemRegressiva()
        if(currentMinutos == "minutos-jogador"){

            currentMinutos = "minutos-adversario"
            currentSegundos = "segundos-adversario"
            contagemRegressiva(currentMinutos, currentSegundos);    
        }else{

            currentMinutos = "minutos-jogador"
            currentSegundos = "segundos-jogador"
            contagemRegressiva(currentMinutos, currentSegundos);
        }
        


      }else{
        if(!response.data.selectedPiece){
            stopGlow(col)
            if(response.data.disSelect){
                var div = document.getElementById(response.data.id)
                console.log(response.data.id)
                stopGlow(div)
            }
        }else{
            startGlow(col)
        }
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}



//====================================================================================
//  PREENCHER O TABULEIRO !!!



const chessBoard = document.querySelector("#chessBoard-container");

for (let rows = 0; rows < 8; rows++) {
    let row = document.createElement('div')
    row.classList.add('row')

    for (let cols = 0; cols < 8; cols++) {
        let col = document.createElement('div')

        col.id = (7 - rows) + "-" + cols;;
        col.addEventListener('click', () => squareOnClick(col));

        if (rows % 2 == 0) {
            if (cols % 2 == 0)
                col.classList.add('col', 'square', 'white')
            else
                col.classList.add('col', 'square', 'dark')

        } else {
            if (cols % 2 == 0)
                col.classList.add('col', 'square', 'dark')
            else
                col.classList.add('col', 'square', 'white')

        }

        row.appendChild(col)
    }

    chessBoard.appendChild(row)
}



// ADICIONANDO PEÇAS =========================================================
//corrigir para adicionar as peças com base no que está no back-end!!!
axios.get('http://localhost:3000/jogar/chessBoard')
    .then(response => {
        const activePieces = response.data;
        const size = activePieces.length;
        console.log(size);  
        for(let i=0; i< size; i++){
            var piece = activePieces[i]
            let color = piece._color
            let currentRow = piece._row
            let currentCol = piece._col
            
            let imgPiece = document.createElement('img');
            imgPiece.style.zIndex = '5'
            imgPiece.classList.add('imgPiece')
            switch (piece.type) {
                case "Pawn":
                    if(color == 0)
                        imgPiece.src = '../assets/img/icons/pieces/pawnwhite.png';
                    else
                        imgPiece.src = '../assets/img/icons/pieces/pawndark.png';

                  break;

                case "King":
                    if(color == 0)
                        imgPiece.src = '../assets/img/icons/pieces/kingwhite.png';
                    else
                        imgPiece.src = '../assets/img/icons/pieces/kingdark.png';
                  break;

                case "Queen":
                    if(color == 0)
                        imgPiece.src = '../assets/img/icons/pieces/queenwhite.png';
                    else
                        imgPiece.src = '../assets/img/icons/pieces/queendark.png';      

                  break;

                case "Bishop":
                    if(color == 0)
                        imgPiece.src = '../assets/img/icons/pieces/bishopwhite.png';
                    else
                        imgPiece.src = '../assets/img/icons/pieces/bishopdark.png';
                  break;

                case "Knight":
                    if(color == 0)
                        imgPiece.src = '../assets/img/icons/pieces/knightwhite.png';
                    else
                        imgPiece.src = '../assets/img/icons/pieces/knightdark.png';
                  break;

                case "Rook":
                    if(color == 0)
                        imgPiece.src = '../assets/img/icons/pieces/rookwhite.png';
                    else
                        imgPiece.src = '../assets/img/icons/pieces/rookdark.png';
                  break;

                default:
                  console.log("peça invalida")
              }
              document.getElementById(currentRow+"-"+currentCol).appendChild(imgPiece)  

        }

    })
    .catch(error => {
        console.error('Erro:', error);
    });




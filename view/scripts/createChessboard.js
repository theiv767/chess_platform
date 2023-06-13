
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
    axios.post('http://localhost:3000/chessBoard/squareOnClick', { id })
    .then(response => {
      console.log(response.data);
        
      //adicionar startGlow(col) para indicar visualmente a peça selecionada
      
      if(response.data.canMov){
        var div = document.getElementById(response.data.idToMov)
        col.innerHTML = div.innerHTML
        div.innerHTML = ''
        stopGlow(div)
        stopGlow(col)

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

for (let pawns = 0; pawns < 8; pawns++) {
    // peões brancos
    let imgPawn1 = document.createElement('img');
    imgPawn1.classList.add('imgPiece')
    imgPawn1.src = '../assets/img/icons/pieces/pawnwhite.png';
    document.getElementById("1-"+pawns).appendChild(imgPawn1)

    //peões pretos
    let imgPawn2 = document.createElement('img');
    imgPawn2.classList.add('imgPiece')
    imgPawn2.src = '../assets/img/icons/pieces/pawndark.png';
    document.getElementById("6-"+pawns).appendChild(imgPawn2)
}

//reis
let imgKing1 = document.createElement('img');
imgKing1.classList.add('imgPiece')
imgKing1.src = '../assets/img/icons/pieces/kingwhite.png';
document.getElementById("0-4").appendChild(imgKing1)

let imgKing2 = document.createElement('img');
imgKing2.classList.add('imgPiece')
imgKing2.src = '../assets/img/icons/pieces/kingdark.png';
document.getElementById("7-4").appendChild(imgKing2)

// damas
let imgQueen1 = document.createElement('img');
imgQueen1.classList.add('imgPiece')
imgQueen1.src = '../assets/img/icons/pieces/queenwhite.png';
document.getElementById("0-3").appendChild(imgQueen1)

let imgQueen2 = document.createElement('img');
imgQueen2.classList.add('imgPiece')
imgQueen2.src = '../assets/img/icons/pieces/queendark.png';
document.getElementById("7-3").appendChild(imgQueen2)


//cavalos
for (let i = 1; i < 7; i += 5) {
    let imgKnight1 = document.createElement('img');
    imgKnight1.classList.add('imgPiece')
    imgKnight1.src = '../assets/img/icons/pieces/Knightwhite.png';
    document.getElementById("0-"+i).appendChild(imgKnight1)

    let imgKnight2 = document.createElement('img');
    imgKnight2.classList.add('imgPiece')
    imgKnight2.src = '../assets/img/icons/pieces/knightdark.png';
    document.getElementById("7-"+i).appendChild(imgKnight2)
}


//bispos
for (let i = 2; i < 6; i += 3) {
    let imgBishop1 = document.createElement('img');
    imgBishop1.classList.add('imgPiece')
    imgBishop1.src = '../assets/img/icons/pieces/bishopwhite.png';
    document.getElementById("0-"+i).appendChild(imgBishop1)

    let imgBishop2 = document.createElement('img');
    imgBishop2.classList.add('imgPiece')
    imgBishop2.src = '../assets/img/icons/pieces/bishopdark.png';
    document.getElementById("7-"+i).appendChild(imgBishop2)
}


//torres
for (let i = 0; i < 8; i += 7) {
    let imgRook1 = document.createElement('img');
    imgRook1.classList.add('imgPiece')
    imgRook1.src = '../assets/img/icons/pieces/rookwhite.png';
    document.getElementById("0-"+i).appendChild(imgRook1)

    let imgRook2 = document.createElement('img');
    imgRook2.classList.add('imgPiece')
    imgRook2.src = '../assets/img/icons/pieces/rookdark.png';
    document.getElementById("7-"+i).appendChild(imgRook2)
}


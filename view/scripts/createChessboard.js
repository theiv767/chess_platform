function squareOnClick(id) {
    axios.post('http://localhost:3000/chessBoard/squareOnClick', { id })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}



//  PREENCHER O TABULEIRO !!!
const chessBoard = document.querySelector("#chessBoard-container");

for (let rows = 0; rows < 8; rows++) {
    let row = document.createElement('div')
    row.classList.add('row')

    for (let cols = 0; cols < 8; cols++) {
        let col = document.createElement('div')

        col.id = cols + "-" + (7 - rows);
        col.addEventListener('click', () => squareOnClick(col.id));

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

for (let pawns = 0; pawns < 8; pawns++) {
    // peões brancos
    let imgPawn1 = document.createElement('img');
    imgPawn1.classList.add('imgPiece')
    imgPawn1.src = '../assets/img/icons/pieces/pawnwhite.png';
    document.getElementById(pawns + "-1").appendChild(imgPawn1)

    //peões pretos
    let imgPawn2 = document.createElement('img');
    imgPawn2.classList.add('imgPiece')
    imgPawn2.src = '../assets/img/icons/pieces/pawndark.png';
    document.getElementById(pawns + "-6").appendChild(imgPawn2)
}

//reis
let imgKing1 = document.createElement('img');
imgKing1.classList.add('imgPiece')
imgKing1.src = '../assets/img/icons/pieces/kingwhite.png';
document.getElementById("4-0").appendChild(imgKing1)

let imgKing2 = document.createElement('img');
imgKing2.classList.add('imgPiece')
imgKing2.src = '../assets/img/icons/pieces/kingdark.png';
document.getElementById("4-7").appendChild(imgKing2)

// damas
let imgQueen1 = document.createElement('img');
imgQueen1.classList.add('imgPiece')
imgQueen1.src = '../assets/img/icons/pieces/queenwhite.png';
document.getElementById("3-0").appendChild(imgQueen1)

let imgQueen2 = document.createElement('img');
imgQueen2.classList.add('imgPiece')
imgQueen2.src = '../assets/img/icons/pieces/queendark.png';
document.getElementById("3-7").appendChild(imgQueen2)


//cavalos
for (let i = 1; i < 7; i += 5) {
    let imgKnight1 = document.createElement('img');
    imgKnight1.classList.add('imgPiece')
    imgKnight1.src = '../assets/img/icons/pieces/Knightwhite.png';
    document.getElementById(i + "-0").appendChild(imgKnight1)

    let imgKnight2 = document.createElement('img');
    imgKnight2.classList.add('imgPiece')
    imgKnight2.src = '../assets/img/icons/pieces/knightdark.png';
    document.getElementById(i + "-7").appendChild(imgKnight2)
}


//bispos
for (let i = 2; i < 6; i += 3) {
    let imgBishop1 = document.createElement('img');
    imgBishop1.classList.add('imgPiece')
    imgBishop1.src = '../assets/img/icons/pieces/bishopwhite.png';
    document.getElementById(i + "-0").appendChild(imgBishop1)

    let imgBishop2 = document.createElement('img');
    imgBishop2.classList.add('imgPiece')
    imgBishop2.src = '../assets/img/icons/pieces/bishopdark.png';
    document.getElementById(i + "-7").appendChild(imgBishop2)
}


//torres
for (let i = 0; i < 8; i += 7) {
    let imgRook1 = document.createElement('img');
    imgRook1.classList.add('imgPiece')
    imgRook1.src = '../assets/img/icons/pieces/rookwhite.png';
    document.getElementById(i + "-0").appendChild(imgRook1)

    let imgRook2 = document.createElement('img');
    imgRook2.classList.add('imgPiece')
    imgRook2.src = '../assets/img/icons/pieces/rookdark.png';
    document.getElementById(i + "-7").appendChild(imgRook2)
}


//Definindo as pecas onde vao ficar as alternativas
const tiles = document.querySelector(".tile-container");

//Definindo os botoes enter e backspace
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");

//Definindo a primeira fileira do teclado
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");

//Definindo a segunda fileira do teclado
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");

////Definindo a terceira fileira do teclado
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

//Definindo as teclas do jogo (teclado)
const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

//Definindo quantas chances a pessoa vai ter
const rows = 6;

//Definindo o tamanho da palavra
const columns = 5;

let currentRow = 0;
let currentColumn = 0;

//Definindo qual a palavra do jogo
let letreco = "VIGOR";

//Mapeando a letra para comparacao
let letrecoMap = {};
for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index;
}
const guesses = [];


//Criando as divs onde as pessoas vao digitar as palavras
for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns);
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute(
      "class",
      rowIndex === 0 ? "tile-column typing" : "tile-column disabled"
    );
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  tiles.append(tileRow);
}

//Validando as tentativas das pessoas
const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== columns) {
    return;
  }

  var currentColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < columns; index++) {
    const letter = guess[index];
    if (letrecoMap[letter] === undefined) {
        currentColumns[index].classList.add("wrong")
    } else {
        if(letrecoMap[letter] === index) {
            currentColumns[index].classList.add("right")
        } else {
            currentColumns[index].classList.add("displaced")
        }
    }
  }

  if(guess === letreco) {
      window.alert("Você conseguiu!!!")
      return
  } {
      if(currentRow === rows -1) {
          window.alert("Hoje não é seu dia de sorte!")
      } else {
          moveToNextRow()
      }
  }
};

//Pulando a linha quando a pessoa erra e entrando na outra
const moveToNextRow = () => {
    var typingColumns = document.querySelectorAll(".typing")
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing")
        typingColumns[index].classList.add("disabled")
    }
    currentRow++
    currentColumn=0

    const currentRowEl = document.querySelector("#row"+currentRow)
    var currentColumns = currentRowEl.querySelectorAll(".tile-column")
    for (let index = 0; index < currentColumns.length; index++) {
        currentColumns[index].classList.remove("disabled")
        currentColumns[index].classList.add("typing")
    }
}

//Recebendo as tentativas
const handleKeyboardOnClick = (key) => {
  if (currentColumn === columns) {
    return;
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};

//Cria os as letras dos teclados
const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.setAttribute("class", "keyboardbtn");
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

//Aqui está passando pelas letras da primeira fileira/ pelas letras da segunda fileira/ pelas letras da terceira fileira
createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

//Apagando uma letra
const handleBackspace = () => {
  if(currentColumn === 0){
      return
  }

  currentColumn--
  guesses[currentRow][currentColumn] = ""
  const tile = document.querySelector("#row"+currentRow+"column"+currentColumn)
  tile.textContent = ""
};

//Criando o botao de backspace
const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "←";
backspaceButton.setAttribute("class", "backspacebtn");
backspaceAndEnterRow.append(backspaceButton);

//Criando o botao de enter
const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "CONFIRMA";
enterButton.setAttribute("class", "enterbtn");
backspaceAndEnterRow.append(enterButton);

//Digitando sem ter que clicar no botao, pelo teclado
document.onkeydown = function (evt) {
    evt = evt || window.evt
    if(evt.key === "Enter"){
        checkGuess();
    } else if (evt.key === "Backspace") {
        handleBackspace()
    } else {
        handleKeyboardOnClick(evt.key.toUpperCase())
    }
}

function showModal() {
    let showModal = document.querySelector(".modal")
    showModal.style.display = "block";
}

function closeModal() {
    let closeModal = document.querySelector(".modal")
    closeModal.style.display = "none";
}
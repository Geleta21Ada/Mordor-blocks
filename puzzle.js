var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function () {
  //initialize the 5x5 board
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img>
      let tile = document.createElement("img");
      tile.src = "./images2/blank.jpg";

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click on image to drag
      tile.addEventListener("dragover", dragOver); //drag an image
      tile.addEventListener("drop", dragDrop); //drop an image onto another one
      tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

      tile.id = "tile_" + r + "_" + c;

      document.getElementById("board").append(tile);
    }
  }

  // Set two specific tiles to black (for example, row 2, column 2 and row 4, column 4)
  setBlackTile(0, 2);
  setBlackTile(0, 1);

  // Initialize puzzle pieces
  initializePuzzlePieces();
};

function setBlackTile(row, column) {
  const blackTile = document.getElementById("tile_" + row + "_" + column);
  blackTile.src = "./images2/blank2.jpg";
}

function initializePuzzlePieces() {
  //pieces
  let pieces = [];
  for (let i = 1; i <= 4; i++) {
    pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    //swap
    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./images/" + pieces[i] + ".jpg";

    //DRAG FUNCTIONALITY
    tile.addEventListener("dragstart", dragStart); //click on image to drag
    tile.addEventListener("dragover", dragOver); //drag an image
    tile.addEventListener("drop", dragDrop); //drop an image onto another one
    tile.addEventListener("dragend", dragEnd); //after you completed dragDrop

    document.getElementById("pieces").append(tile);
  }
}

// DRAG TILES
function dragStart() {
  currTile = this; //this refers to the image that was clicked on for dragging
}

function dragOver(e) {
  if (this.src.includes("blank2")) {
  } else {
    e.preventDefault();
  }
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to the image that is being dropped on
}

function dragEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;
}

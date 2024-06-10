let board;
let sliderSize;
let sliderSpeed;
let sortButton;
let click;

function preload(){
  //click = loadSound('mixkit-arcade-game-jump-coin-216.wav');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderSize = createSlider(0, 100, 20, 1);
  sliderSize.position(10, 30);
  sliderSize.size(200);
  sliderSize.changed(arrayResize);

  sliderSpeed = createSlider(1, 1000, 100, 1);
  sliderSpeed.position(300, 30);
  sliderSpeed.size(200);
  arrayResize(10)
  //sortButton = createButton('SORT');
 // sortButton.position(500, 10);
 // sortButton.mousePressed(()=>board.sort());
}


let j = 1;
let i =0;

function draw() {
  background(0, 225, 255);
  fill(0);
  textSize(20);
  text("ArraySize : " + sliderSize.value(), 15, 20);
  text("IterationSpeed : " + sliderSpeed.value(), 300, 20);
  board.drawBoard();
  
  if(j>=500/sliderSpeed.value()&&!board.isSorted()){
      j=0;
      if(i ==board.length()-1){
        i=0
        board.array.forEach(element => {
          element.isSwapped=false;
          element.release();
        });
      }

      else if( i < board.length() - 1) {
        if(i!=0){
          board.array[i-1].release();
        }else{
          board.array[board.length()-1].release();
        }
        if (board.array[i].access() < board.array[i + 1].access()) {
         // if(!click.isPlaying()){
         //   click.play()
         // }
          let temp = board.array[i].getIndex();
          board.array[i].setIndex(board.array[i + 1].getIndex());
          board.array[i + 1].setIndex(temp);
          temp = board.array[i];
          board.array[i] = board.array[i + 1];
          board.array[i + 1] = temp;
          board.array[i].swapped()
        }
        i++
      }
    }else{
      j++;
    }
  }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function arrayResize() {
  intArray = Array.from(
    { length: sliderSize.value() },
    () => Math.floor(Math.random() * (10 - 1 + 1)) + 1
  );

  board = new Board(intArray);
  i=0;
  j=0;
}

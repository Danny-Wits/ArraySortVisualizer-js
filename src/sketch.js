let board;
let sliderSize;
let sliderSpeed;
let sortButton;
let click;
let audio;
let shuffleB;
let sortB;
let sortM;
let div;
let pauseB;
function preload() {
  click = loadSound("src\\assets\\mixkit-arcade-game-jump-coin-216.wav");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  sliderSize = createSlider(1, 300, 20, 1);
  sliderSize.position(10, 30);
  sliderSize.size(200);
  sliderSize.changed(arrayResize);

  sliderSpeed = createSlider(1, 500, 100, 1);
  sliderSpeed.position(600, 30);
  sliderSpeed.size(200);
  sliderSpeed.changed(() => {
    board.setSpeed(sliderSpeed.value());
  });


  audio = createCheckbox("AUDIO");
  audio.position(600, 60);

  shuffleB = createButton("SHUFFLE");
  shuffleB.mouseClicked(() => {
   arrayResize();
  });
  sortB = createButton("BUBBLE SORT");
  sortB.mouseClicked(() => {
    (board.running = true), board.BubbleSort();
  });
  sortM = createButton("MERGE SORT");
  sortM.mouseClicked(() => {
    board.running = true;
   board.MergeSort(board.array);
  });

  div = createDiv();
  div.position(10,60);
  div.child(shuffleB);
  div.child(sortB);
  div.child(sortM);
  div.show();


  // pauseB = createButton("PAUSE/RESUME");
  // pauseB.position(10, 100);
  // pauseB.mouseClicked(() => board.pause());
  arrayResize();
}
const Y_AXIS = 1;
const X_AXIS = 2;
function draw() {
  background(0,200,255)
  fill(0);
  textSize(20);
  text("ArraySize : " + sliderSize.value(), 15, 20);
  text("IterationSpeed : " + sliderSpeed.value(), 600, 20);
  board.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function arrayResize() {
  intArray = Array.from({ length: sliderSize.value() }, () => random(10) + 1);
  board = new Board(intArray, sliderSpeed.value());
}

function swapped() {
  if (audio.checked()) {
    if (!click.isPlaying()) {
      click.play();
    }
  }
}

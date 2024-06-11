let board;
let sliderSize;
let sliderSpeed;
let sortButton;
let click;
let audio;
let sortB;
let sortI;
let pauseB;
function preload() {
  click = loadSound("src\\mixkit-arcade-game-jump-coin-216.wav");
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  sliderSize = createSlider(1, 100, 20, 1);
  sliderSize.position(10, 30);
  sliderSize.size(200);
  sliderSize.changed(arrayResize);

  sliderSpeed = createSlider(1, 100, 30, 1);
  sliderSpeed.position(300, 30);
  sliderSpeed.size(200);
  sliderSpeed.changed(() => {
    board.setSpeed(sliderSpeed.value());
  });

  audio = createCheckbox("AUDIO");
  audio.position(300, 60);

  sortB = createButton("BUBBLE SORT");
  sortB.position(10, 60);
  sortB.mouseClicked(() => {board.running=true,board.sortBStep(0);});

  sortI = createButton("SORT");
  sortI.position(120, 60);
  sortI.mouseClicked(() => board.sort());

  pauseB = createButton("PAUSE/RESUME");
  pauseB.position(10, 100);
  pauseB.mouseClicked(() => board.pause());
  arrayResize();
}

function draw() {
  background(0, 225, 255);
  board.drawBoard();
  fill(0);
  textSize(20);
  text("ArraySize : " + sliderSize.value(), 15, 20);
  text("IterationSpeed : " + sliderSpeed.value(), 300, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function arrayResize() {
  intArray = Array.from({ length: sliderSize.value() }, () => random(10) + 1);
  board = new Board(intArray, sliderSpeed.value());
}

function clicked() {
  if (audio.checked()) {
    if (!click.isPlaying()) {
      click.play();
    }
  }
}

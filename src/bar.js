class bar {
  constructor(value, index, width) {
    this.isAccessed = false;
    this.value = value;
    this.index = index;
    this.width = width;
    this.isSwapped = false;
    this.height = value * 30;
  }
  draw(x, y,index) {
    if (this.isSwapped) {
      fill(255, 255, 0);
      } else if (this.isAccessed) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    rect(x + index * this.width, y, this.width, this.height);
    textFont("DIGIFACE",(this.width*0.7 >50)?50:this.width*0.7);
    fill(0)
    text(Math.floor(this.value),x + index * this.width+(this.width/4),y+this.height-5)
  }
  access() {
    this.isAccessed = true;
    return this.value;
  }
  release() {
    this.isAccessed = false;
  }
  setIndex(x) {
    this.index = x;
  }
  getIndex() {
    return this.index;
  }
  getValue(){
    return this.value;
  }
  swapped() {
    this.isSwapped = true;
    this.isAccessed = false;
  }
}

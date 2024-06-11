class bar {
  constructor(value, index, width) {
    this.isAccessed = false;
    this.value = value;
    this.index = index;
    this.width = width;
    this.isSwapped = false;
    this.height = value * 30;
  }
  draw(x, y) {
    if (this.isSwapped) {
      fill(255, 255, 0);
      } else if (this.isAccessed) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    rect(x + this.index * this.width, y, this.width, this.height);
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
  swapped() {
    this.isSwapped = true;
    this.isAccessed = false;
  }
}

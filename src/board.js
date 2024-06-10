class Board {
  constructor(ar) {
    this.array = new Array();

    for (let index = 0; index < ar.length; index++) {
      this.array.push(new bar(ar[index], index, 200 / ar.length + 10));
    }
  }
  length() {
    return this.array.length;
  }
  drawBoard() {
    for (let index = 0; index < this.array.length; index++) {
      this.array[index].draw(100, 100);
    }
  }
  accessElement(index) {
    this.array[index].access();
  }
  releaseElement(index) {
    this.array[index].release();
  }
  sort() {
    let flag = true;
    while (flag) {
      flag = false;
      for (let i = 0; i < this.array.length - 1; i++) {
        if (this.array[i].access() < this.array[i + 1].access()) {
          let temp = this.array[i].getIndex();
          this.array[i].setIndex(this.array[i + 1].getIndex());
          this.array[i + 1].setIndex(temp);
          temp = this.array[i];
          this.array[i] = this.array[i + 1];
          this.array[i + 1] = temp;
          flag = true;
        }
        this.array[i].release();
      }
    }
    console.table(this.array);
  }
  isSorted() {
    let flag = true;
    for (let i = 0; i < this.array.length - 1; i++) {
      if (this.array[i].value < this.array[i + 1].value) {
        flag = false;
      }
    }
    return flag;
  }
}

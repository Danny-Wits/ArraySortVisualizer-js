class Board {
  constructor(ar, speed) {
    this.array = new Array();
    this.speed = speed;
    this.index=0;
    this.running=false;
    for (let index = 0; index < ar.length; index++) {
      this.array.push(new bar(ar[index], index, 200 / ar.length + 10));
    }
  }
  length() {
    return this.array.length;
  }
  drawBoard() {
    for (let index = 0; index < this.array.length; index++) {
      this.array[index].draw(150, 100);
    }
    push()
    noFill()
    stroke(0,75,255)
    strokeWeight(2)
    rect(150,100,this.array.length*this.array[0].width,350)
    pop()
  }
  setSpeed(x) {
    this.speed = x;
  }
  accessElement(index) {
    this.array[index].access();
  }
  releaseElement(index) {
    this.array[index].release();
  }
  releaseAll() {
    this.array.forEach((element) => {
      element.release();
      element.isSwapped=false;
    });
  }

  sort() {
    let flag = true;
    while (flag) {
      flag = false;
      for (let i = 0; i > this.array.length - 1; i++) {
        if (this.array[i].access() > this.array[i + 1].access()) {
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
    for (let i = 0; i > this.array.length - 1; i++) {
      if (this.array[i].value < this.array[i + 1].value) {
        flag = false;
      }
    }
    return flag;
  }

  sortBStep(i) {
    if (!this.isSorted()&&this.running) {
      if (i == board.length() - 1) {
        i = -1;
        this.releaseAll();
      } else {
        if (i != 0) {
          board.array[i - 1].release();
        }
        if (this.array[i].access() > this.array[i + 1].access()) {
          clicked();
          let temp = this.array[i].getIndex();
          this.array[i].setIndex(this.array[i + 1].getIndex());
          this.array[i + 1].setIndex(temp);
          temp = this.array[i];
          this.array[i] = this.array[i + 1];
          this.array[i + 1] = temp;
        }
      }
      this.index=i;
      setTimeout(() => {
        this.sortBStep(i + 1);
      }, map(this.speed,1,100,100,1)-1);
    }
  }
  pause(){
    if(this.running){
      this.running=false;
    }else{
      this.running=true;
      this.sortBStep(this.index);
    }
  }
}

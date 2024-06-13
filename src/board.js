class Board {
  constructor(ar, speed) {
    this.array = new Array();
    this.pause = map(speed, 1, 500, 500, 1) - 1;
    this.index = 0;
    this.running = false;
    this.l = 0;
    this.r = 0;
    for (let index = 0; index < ar.length; index++) {
      this.array.push(new bar(ar[index], index, 1000 / ar.length + 1));
    }
   // console.table(this.array);
  }
  length() {
    return this.array.length;
  }
  draw() {
    for (let index = 0; index < this.array.length; index++) {
      this.array[index].draw(50, 100, index);
    }
    //console
    push();
    noFill();
    stroke(0, 20, 100);
    strokeWeight(2);
    rect(50, 100, this.array.length * this.array[0].width, 350);
    pop();
  }
  setSpeed(x) {
    this.pause = map(x, 1, 500, 500, 1) - 1;
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
      element.isSwapped = false;
    });
  }

  isSorted() {
    let flag = true;
    for (let i = 0; i < this.array.length - 1; i++) {
      if (this.array[i].value > this.array[i + 1].value) {
        flag = false;
      }
    }
    return flag;
  }

  async BubbleSort() {
    while (!this.isSorted() && this.running) {
      for (let i = 0; i < this.array.length - 1; i++) {
        if (this.array[i].access() > this.array[i + 1].access()) {
          swapped();
          this.swap(i, i + 1);
        }
        await this.delay(this.pause);
        this.array[i].release();
      }
    }
    //console.table(this.array);
  }

  MergeSort(array) {
    if (this.isSorted()) return;
    let len = array.length;
    if (len <= 1) return;
    let middle = floor(len / 2);
    let leftArray = new Array(middle);
    let rightArray = new Array(len - middle);
    for (let i = 0; i < middle; i++) {
      leftArray[i] = array[i];
    }
    for (let i = middle; i < len; i++) {
      rightArray[i - middle] = array[i];
    }
    this.MergeSort(leftArray);
    this.MergeSort(rightArray);
    this.merge(leftArray, rightArray, array);
  }

  async merge(leftArray, rightArray, array) {
    // console.table(leftArray)
    // console.table(rightArray)
    let leftArrayLength = leftArray.length;
    let rightArrayLength = rightArray.length;
    let index = 0;
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArrayLength && rightIndex < rightArrayLength) {
      if (leftArray[leftIndex].getValue() < rightArray[rightIndex].getValue()) {
        array[index] = leftArray[leftIndex];
        swapped();
        array[index].access();
        await this.delay(this.pause);
        array[index].release();
        leftIndex++;
        index++;
      } else {
        array[index] = rightArray[rightIndex];
        array[index].access();
        await this.delay(this.pause);
        array[index].release();
        swapped();
        swapped();
        rightIndex++;
        index++;
      }
    }
    while (leftIndex < leftArrayLength) {
      array[index] = leftArray[leftIndex];
      swapped();
      leftIndex++;
      index++;
      await this.delay(this.pause);
    }
    while (rightIndex < rightArrayLength) {
      array[index] = rightArray[rightIndex];
      swapped();
      rightIndex++;
      index++;
      await this.delay(this.pause);
    }
  }

  swap(i, j) {
    let temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }

  pause() {
    // if (this.running) {
    //   this.running = false;
    // } else {
    //   this.running = true;
    //   this.BubbleSort();
    // }
  }
  delay(delayMS) {
    return new Promise((resolve) => setTimeout(resolve, delayMS));
  }
}

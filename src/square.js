class Square {
  constructor(elem, className, parentNode, size) {
    this.elem = elem;
    this.className = className;
    this.parentNode = parentNode;
    this.size = size;
  }

  moveSquare() {
    const move = () => {
      pos+= 1;
      box.style.left = pos+"px";
    }
    const stop = () => {
      clearInterval(interval);
    }
    
    const interval = setInterval(move, 10);
    setTimeout(stop, 1000);
  }
  
}
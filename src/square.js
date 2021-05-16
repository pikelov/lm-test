/**
 * 
 */
 class Square {
  //Link to dom element that contains square instance
  #element;
  #movesInterval;
  #queue = [];
  #queueInterval;
  #queueIsActive = false;
  className = "box"
  size = 100;
  
  //Setting up crucial square params
  constructor ({ selector, parentNode, size }) {
    this.selector = selector;
    this.parentNode = parentNode;
    this.size = size;
    
    this.#build();
  }
  
  #build () {
    const parentNode = document.querySelector(this.selector);
    if (!parentNode) return;
    
    this.#element = document.createElement("div");
    this.#element.classList.add(this.className);
    this.setStyles({
      width: this.size + 'px',
      height: this.size + 'px',
      backgroundColor: '#000000',
      position: "absolute"
    })
    
    parentNode.insertAdjacentElement('afterbegin', this.#element);
  }
  
  setStyles (styleObj) {
    for (const property in styleObj) {
      if(styleObj.hasOwnProperty(property)) {
        this.#element.style[property] = styleObj[property]
      }
    }
  }
  
  moveSquareRight(direction, interval) {
    let leftPosition = this.#element.offsetLeft
    const move = () => {
      this.setStyles({
        "left": ++leftPosition + "px"
      })
    }

    this.#queueIsActive = true;
    this.#movesInterval = setInterval(move, interval);
  }

  stopMoves(){
    clearInterval(this.#movesInterval);
    this.applyQueue();
  }

  //Apply everything that is in queue
  applyQueue() {
    const readFromQueue = () => {
      if(this.#queue.length) {
        const queueItem = this.#queue.shift();
        this[queueItem.action] (queueItem.params)
      }
      else {
        this.#queueIsActive = false;
        clearInterval(this.#queueInterval);
      }
    }
    this.#queueInterval = setInterval(readFromQueue, 1);
  }

  //If queue is active, add new item, otherwise apply right away
  applyViaQueue(action, params) {
    if(this.#queueIsActive) {
      this.#queue.push({ action, params });
    }
    else {
      this[action](params);
    }
  }
}

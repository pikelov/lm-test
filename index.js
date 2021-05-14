'use strict'

createSquare('div', 'box', 'BODY', 100);

const box = document.querySelector('.box')
let pos = 0;

setTimeout(startOp, 1000)

//=====HELPERS
function startOp(){
  moveSquare();
  fetch('https://keev.me/f/slowpoke.php')
    .then(response => {
      if(!response.ok) {
        box.style.backgroundColor= 'red';
        throw response.statusText
      } })
    .then(data => data ? box.style.backgroundColor= 'green' : box.style.backgroundColor= 'blue')
    .catch((error) => {
    console.log('Error:', error);
  });
} 
//======
function createSquare(element, classAdd, parentNode, size) {
  const domNode = document.getElementsByTagName(parentNode)[0];

  if (typeof domNode === 'undefined' || domNode === null) return;
  const elem = document.createElement(element);console.log(elem)
  elem.classList.add(classAdd);
  elem.style.width = size + 'px'
  elem.style.height = size + 'px'
  elem.style.backgroundColor = 'black'
  domNode.insertAdjacentElement('afterbegin', elem);
}
//===
function moveSquare() {
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

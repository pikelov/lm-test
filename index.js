'use strict'

// - Функция вызывается однократно на пустой странице браузера (пустой тег body).
//  В момент вызова функция рисует чёрный квадрат со стороной 100px в левом верхнем углу окна.
let square = new Square({
  selector: "body",
  size: 100,
})
const start = Date.now();

setTimeout(function (){
  //В этот же момент (через секунду после вызова функции) посылается GET-запрос на переданный URL.
  fetch('https://keev.me/f/slowpoke.php')
    .then(response => {
      console.log(`Get response after ${start - Date.now()} ms after function`)
      if(!response.ok) {
        square.applyViaQueue("setStyles", { backgroundColor: "red" });
      }
      else {
        return response.text();
      }
    })
    .then(data => {
        if(data !== undefined) {
            square.applyViaQueue("setStyles", { backgroundColor: data === "1" ? 'green' : 'blue' })
        }
    })
    .catch((error) => {
    console.log('Error:', error);
    });
  
  // Через секунду после вызова функции квадрат начинает равномерное движение вправо со скоростью 100px в секунду.
  square.moveSquareRight("right", 10)
  console.log(`after ${start - Date.now()} ms after function move square & fetch api`)
}, 1000)

// Через две секунды после вызова (то есть через одну секунду после старта движения) квадрат должен остановиться.
setTimeout(function (){
  console.log(`after ${start - Date.now()} ms after function stop square`)
  square.stopMoves()
}, 2000)

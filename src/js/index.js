import Game from './game.js';
import View from './view.js'

const root = document.querySelector('#root');


const game = new Game();
const view=new View(root,320,640,20,10)



//для того чтобы game было глобально, так как const не попадает в глобальное пространство имен из за использования  модулей
window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
   switch (event.keyCode) {
      case 37://LEFT ARROW
         game.movePieceLeft();
         view.renderGame(game.getState());
         break;
      case 38://UP ARROW
         game.rotatePiece();
         view.renderGame(game.getState());
         break;
      case 39://RIGHT ARROW
         game.movePieceRight();
         view.renderGame(game.getState());
         break;
      case 40://DOWN ARROW
         game.movePieceDown();
         view.renderGame(game.getState());
         break;
   }
   
})


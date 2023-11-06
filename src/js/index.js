import Game from './game.js';
import View from './view.js'

const root = document.querySelector('#root');


const game = new Game();
const view=new View(root,320,640,20,10)



//для того чтобы game было глобально, так как const не попадает в глобальное пространство имен из за использования  модулей
window.game = game;
window.view = view;

view.renderPlayfield(game.getState());
// for (let index = 0; index < 19; index++) {
//    game.movePieceDown();
   
// }
// console.log(game.playfield)
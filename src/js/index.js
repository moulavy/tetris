import Game from './game.js';
const game = new Game();

//для того чтобы game было глобально, так как const не попадает в глобальное пространство имен из за использования  модулей
window.game = game;

console.log(game);
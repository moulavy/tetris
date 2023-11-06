import Game from './game.js';
import View from './view.js';
import Controller from './controller.js'

const root = document.querySelector('#root');


const game = new Game();
const view=new View(root,480,640,20,10)
const controller=new Controller(game,view)

//для того чтобы game было глобально, так как const не попадает в глобальное пространство имен из за использования  модулей
window.game = game;
window.view = view;
window.controller = controller;




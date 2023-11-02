export default class Game{
   constructor() {
      this.score = 0;
      this.lines = 0;
      this.level = 0;
      //поле в тетрисе имеет размеры 10*20
      this.playfield = [
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
//активная фигура
      this.activePiece = {
         x: 0,
         y: 0,
         blocks:[
            [0,1,0],
            [1,1,1],
            [0,0,0]
         ]
      }
   }
//перемещение
   movePieceLeft() {
      this.activePiece.x -= 1;
      if (this.isPieceOutOfBounds()) {
         this.activePiece.x += 1;
      }
   }
   movePieceRight() {
      this.activePiece.x += 1;
      if (this.isPieceOutOfBounds()) {
         this.activePiece.x -= 1;
      }
   }
   movePieceDown() {
      this.activePiece.y += 1;
      if (this.isPieceOutOfBounds()) {
         this.activePiece.y -= 1;
      }
   }
//метод возвращает за пределами границ мы или нет
   isPieceOutOfBounds() {

      const { y, x } = this.activePiece;
      return this.playfield[y] === undefined || this.playfield[y][x] === undefined;
   }
}
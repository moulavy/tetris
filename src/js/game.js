export default class Game {
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
         blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
         ]
      }
   }
   //перемещение
   movePieceLeft() {
      this.activePiece.x -= 1;
      if (this.isPieceOutOfBounds()) {
         this.activePiece.x += 1;
         this.lockPiece();
      }
   }
   movePieceRight() {
      this.activePiece.x += 1;
      if (this.isPieceOutOfBounds()) {
         this.activePiece.x -= 1;
         this.lockPiece();
      }
   }
   movePieceDown() {
      this.activePiece.y += 1;
      if (this.isPieceOutOfBounds()) {
         this.activePiece.y -= 1;
         this.lockPiece();
      }
   }
   //метод возвращает за пределами границ мы или нет
   hasCollusion() {
      const { y: pieceY, x: pieceX } = this.activePiece;
      const blocks = this.activePiece.blocks;
      //внешний цикл перебирает ряды, внутренний цикл перебирает элементы ряда
      for (let row = 0; row < blocks.length; row++) {
         for (let col = 0; col < blocks[row].length; col++) {
            if (blocks[row][col] && ((this.playfield[pieceY + row] === undefined || this.playfield[pieceY + row][pieceX + col] === undefined) || 
            this.playfield[pieceY+row][pieceX+col])) {
               return true;
            }
         }
      }
      return false;
   }
   //метод который переносит фигуру на игровое поле(фиксирует фигуру)
   lockPiece() {
      const { y: pieceY, x: pieceX } = this.activePiece;
      const blocks = this.activePiece.blocks;
      //внешний цикл перебирает ряды, внутренний цикл перебирает элементы ряда
      for (let row = 0; row < blocks.length; row++) {
         for (let col = 0; col < blocks[row].length; col++) {
            if (blocks[row][col]) {
               //копируем значения из массива blocks в массив playfield
               this.playfield[pieceY + row][pieceX + col] = blocks[row][col]
            }
         }
      }
   }
}

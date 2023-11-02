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
         x: 0,//текущая позиция фигуры по горизонтали
         y: 0,//текущая позиция фигуры по веертикали
         blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
         ]
      }
   }
   //перемещение
   movePieceLeft() {
      this.activePiece.x -= 1;//пермещение фигуры влево
      if (this.hasCollusion()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.x += 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
      }
   }
   movePieceRight() {
      this.activePiece.x += 1;//пермещение фигуры вправо
      if (this.hasCollusion()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.x -= 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
      }
   }
   movePieceDown() {
      this.activePiece.y += 1;//пермещение фигуры вниз
      if (this.hasCollusion()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.y -= 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
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
      // копируем значения из матрицы фигуры в игровое поле
      for (let row = 0; row < blocks.length; row++) {
         for (let col = 0; col < blocks[row].length; col++) {
            if (blocks[row][col]) {               
               this.playfield[pieceY + row][pieceX + col] = blocks[row][col]
            }
         }
      }
   }
}

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
         get blocks() {
            return this.rotations[this.rotationIndex];
         },
         blocks: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
         ],
      }
   }
   //перемещение
   movePieceLeft() {
      this.activePiece.x -= 1;//пермещение фигуры влево
      if (this.hasObstacle()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.x += 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
      }
   }
   movePieceRight() {
      this.activePiece.x += 1;//пермещение фигуры вправо
      if (this.hasObstacle()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.x -= 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
      }
   }
   movePieceDown() {
      this.activePiece.y += 1;//пермещение фигуры вниз
      if (this.hasObstacle()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.y -= 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
      }
   }
   rotatePiece() {
      const blocks = this.activePiece.blocks;
      const length = blocks.length;

      const tempRotate = [];//временный массив для разворота
      for (let i = 0; i < length; i++) {
         //заполняем массив нулями
         tempRotate[i] = new Array(length).fill(0);
      }
      //вращаем матрицу, переносим блоки из исходной матрицы blocks во временную tempRotate, вращая на 90 градусов blocks
      for (let y = 0; y < length; y++){
         for (let x = 0; x < length; x++){
            tempRotate[x][y] = blocks[length - 1 - y][x];
         }
      }
      //записываем результат в активную фигуру
      this.activePiece.blocks = tempRotate;
      //если есть препятствие - возвращаем исходное положение блока
      if (this.hasObstacle()) {
         this.activePiece.blocks = blocks;
      }
   }
   //метод возвращает за пределами границ мы или нет
   hasObstacle() {
      //получаем активные координаты, положение и форму активной фигуры
      const { y: pieceY, x: pieceX, blocks } = this.activePiece;
      
      //внешний цикл перебирает ряды, внутренний цикл перебирает элементы ряда
      for (let row = 0; row < blocks.length; row++) {
         for (let col = 0; col < blocks[row].length; col++) {
            //проверяем если часть блока видимая (не 0) и (фигура выходит за границу поля или на этой позиции уже занято другой фигурой)
            if (blocks[row][col] && 
               ((this.playfield[pieceY + row] === undefined || this.playfield[pieceY + row][pieceX + col] === undefined) ||
               this.playfield[pieceY + row][pieceX + col])) {
               return true;//возвращаем true - фигура имеет препятствие, невозможно выполнить действие
            }
         }
      }
      return false;
   }
   //метод который переносит фигуру на игровое поле(фиксирует фигуру)
   lockPiece() {
      const { y: pieceY, x: pieceX,blocks} = this.activePiece;
      
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

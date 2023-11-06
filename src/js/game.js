export default class Game {
   constructor() {
      this.score = 0;
      this.lines = 0;
      this.level = 0;
      //поле в тетрисе имеет размеры 10*20
      this.playfield = this.createPlayfield();
      //активная фигура
      this.activePiece = this.createPiece();
      this.nextPiece = this.createPiece();
   }
   //возвращает текущее состояние игрового поля, для отображения фигур на экране
   getState() {
      const playfield = this.createPlayfield();
      //извлекаем координаты и форму фигуры через деструктуризацию
      const { y: pieceY, x: pieceX, blocks } = this.activePiece;
      //создаем копию игрового поля, чтобы не менять состояние оригинального поля
      for (let y = 0; y < this.playfield.length; y++) {
         playfield[y] = [];
         for (let x = 0; x < this.playfield[y].length; x++) {
            playfield[y][x] = this.playfield[y][x]
         }
      }
      //обновляем временное игровое поле в соответствии с активной фигурой
      for (let y = 0; y < blocks.length; y++) {
         for (let x = 0; x < blocks[y].length; x++) {
            if (blocks[y][x]) {
               //копируем на игровое поле с учетом смещения
               playfield[pieceY + y][pieceX + x] = blocks[y][x];
            }
         }
      }
      return {
         playfield
      }
   }

   createPlayfield() {
      const playfield = [];
      for (let y = 0; y < 20; y++) {
         playfield[y] = [];
         for (let x = 0; x < 10; x++) {
            playfield[y][x] = 0;
         }
      }
      return playfield;
   }
   createPiece() {
      const index = Math.floor(Math.random() * 7);
      const type = 'IJLOSTZ'[index];
      const piece = {};
      switch (type) {
         case 'I':
            piece.blocks = [
               [0, 0, 0, 0],
               [1, 1, 1, 1],
               [0, 0, 0, 0],
               [0, 0, 0, 0]
            ];
            break;
         case 'J':
            piece.blocks = [
               [0, 0, 0],
               [2, 2, 2],
               [0, 0, 2]
            ];
            break;
         case 'L':
            piece.blocks = [
               [0, 0, 0],
               [3, 3, 3],
               [3, 0, 0]
            ];
            break;
         case 'O':
            piece.blocks = [
               [0, 0, 0, 0],
               [0, 4, 4, 0],
               [0, 4, 4, 0],
               [0, 0, 0, 0]
            ];
            break;
         case 'S':
            piece.blocks = [
               [0, 0, 0],
               [0, 5, 5],
               [5, 5, 0]
            ];
            break;
         case 'T':
            piece.blocks = [
               [0, 0, 0],
               [6, 6, 6],
               [0, 6, 0]
            ];
            break;
         case 'Z':
            piece.blocks = [
               [0, 0, 0],
               [7, 7, 0],
               [0, 7, 7]
            ];
            break;
         default:
            throw new Error('Неизвестный тип фигуры.')
      }
      //посчитаем на сколько влево надо сдвинуться
      piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
      //зададим -1 из за отступа фигуры
      piece.y = -1;
      return piece;
   }
   //перемещение
   movePieceLeft() {
      this.activePiece.x -= 1;//пермещение фигуры влево
      if (this.hasObstacle()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.x += 1;//возвращаем фигуру на предыдущую позицию
      }
   }
   movePieceRight() {
      this.activePiece.x += 1;//пермещение фигуры вправо
      if (this.hasObstacle()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.x -= 1;//возвращаем фигуру на предыдущую позицию
      }
   }
   movePieceDown() {
      this.activePiece.y += 1;//пермещение фигуры вниз
      if (this.hasObstacle()) {//если фигура сталкивается с границей или другой фигурой
         this.activePiece.y -= 1;//возвращаем фигуру на предыдущую позицию
         this.lockPiece();//фиксируем фигуру на игровом поле
         this.clearLines();
         this.updatePieces();
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
      for (let y = 0; y < length; y++) {
         for (let x = 0; x < length; x++) {
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
      const { y: pieceY, x: pieceX, blocks } = this.activePiece;

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

   clearLines() {
      const rows = 20;
      const columns = 10;
      let lines = [];
      for (let y = rows - 1; y >= 0; y--) {
         let numberOfBlocks = 0;
         for (let x = 0; x < columns; x++) {
            if (this.playfield[y][x]) {
               numberOfBlocks += 1;
            }
         }
         //если линия пустая то выходим, так как выше рядов быть не может
         if (numberOfBlocks === 0) {
            break;
         }
         else if (numberOfBlocks < columns) {
            continue;
         }
         else if (numberOfBlocks === columns) {
            lines.unshift(y)
         }
      }

      for (let index of lines) {
         this.playfield.splice(index, 1);
         this.playfield.unshift(new Array(columns).fill(0));
      }
   }

   updatePieces() {
      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();
   }
}

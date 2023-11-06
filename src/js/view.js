export default class View {
   constructor(element, width, height, rows, columns) {
      this.element = element;
      this.width = width;
      this.height = height;

      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.context = this.canvas.getContext('2d');

      this.blockWidth = this.width / columns;
      this.blockHeight = this.height / rows;

      this.element.appendChild(this.canvas);
   }
   //на основе массива playfield строим представление
   renderGame({ playfield }) {
      this.clearScreen();
      this.renderPlayfield(playfield);
   }

   renderPlayfield(playfield) {
      for (let row = 0; row < playfield.length; row++) {
         const line = playfield[row];
         for (let col = 0; col < line.length; col++) {
            const block = line[col];
            if (block) {
               this.renderBlock(col * this.blockWidth, row * this.blockHeight, this.blockWidth, this.blockHeight,'red')
            }
         }
      }
   }
   renderBlock(x,y,width,height,color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;

      this.context.fillRect(x, y, width, height);
      this.context.strokeRect(x, y, width, height);
   }
   clearScreen() {
      //очищаем весь холст
      this.context.clearRect(0, 0, this.width, this.height);
   }
}
import { Ball } from "./ball.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // this.ball = [];
    // for (let i = 0; i < 10; i++) {
    //   this.ball[i] = new Ball(this.stageWidth, this.stageHeight, 100, 15);
    // }
    this.colors = ["red", "yello", "blue", "white"];
    // this.index = Math.floor(Math.random() * this.colors.length - 1);
    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15, "red");

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // this.ball.forEach((v) => {
    //   v.draw(this.ctx, this.stageWidth, this.stageHeight);
    // });
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight);
  }
}

window.onload = () => {
  new App();
};

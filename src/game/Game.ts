import {
  MAX_SPRITES,
  MAZE_DIMENSION_X,
  MAZE_DIMENSION_Y,
} from "../constants/constants";
import { random } from "../utils/random";
import { Maze } from "./Maze";
import { GameProperties, IDrawable } from "./models";
import { Sprite } from "./Sprite";

const getCanvasById = (id: string): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement | null = document.getElementById(
    id
  ) as HTMLCanvasElement;
  if (!canvas) {
    throw new Error(`No canvas with id ${id}`);
  }

  return canvas;
};

export class Game implements IDrawable {
  isGameStarted: boolean = false;
  canvas: HTMLCanvasElement;
  graphics: CanvasRenderingContext2D;
  sprites: Array<Sprite> = [];
  gameProperties: GameProperties;
  maze: Maze;

  constructor(canvas: HTMLCanvasElement, gameProperties: GameProperties) {
    this.canvas = canvas;
    const graphics = canvas.getContext("2d");
    if (!graphics) {
      throw new Error("No graphics context");
    }

    this.graphics = graphics;
    this.gameProperties = gameProperties;
    this.maze = new Maze(MAZE_DIMENSION_X, MAZE_DIMENSION_Y);
  }
  draw(graphics: CanvasRenderingContext2D, gameProperties: GameProperties) {
    graphics.clearRect(0, 0, this.canvas.width, this.canvas.height);
    graphics.lineWidth = 2;
    graphics.lineCap = "square";
    graphics.lineJoin = "bevel";
    this.maze.draw(graphics, gameProperties);

    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].draw(graphics);
    }

    graphics.fillStyle = "rgb(255,0,0)";
    graphics.font = "14px Arial";
    graphics.fillText(
      "Puntuacion(marron): " + gameProperties.player1Properties.score,
      30,
      15
    );
    if (gameProperties.player1Properties.wallsCanJump > 0)
      graphics.fillText(
        "Puede atravesar  " +
          gameProperties.player1Properties.wallsCanJump +
          " paredes",
        200,
        15
      );
    graphics.fillStyle = "rgb(0,0,255)";
    graphics.font = "14px Arial";
    graphics.fillText(
      "Puntuacion(blanco): " + gameProperties.player2Properties.score,
      700,
      15
    );
    if (gameProperties.player2Properties.wallsCanJump > 0)
      graphics.fillText(
        "Puede atravesar  " +
          gameProperties.player2Properties.wallsCanJump +
          " paredes",
        500,
        15
      );

    graphics.stroke();
  }

  public static createGame(
    idCanvas: string,
    gameProperties: GameProperties
  ): Game {
    const canvas: HTMLCanvasElement = getCanvasById(idCanvas);
    return new Game(canvas, gameProperties);
  }

  init() {
    this.maze.initialize();
    this.maze.generate();

    this.gameProperties.player1Properties.position.x = random(
      this.maze.dimensionX
    );
    this.gameProperties.player1Properties.position.y = random(
      this.maze.dimensionY
    );
    this.gameProperties.player2Properties.position.x = random(
      this.maze.dimensionX
    );
    this.gameProperties.player2Properties.position.y = random(
      this.maze.dimensionY
    );

    this.maze.getCell(this.gameProperties.player1Properties.position).state = "PLAYER_1";

    this.maze.getCell(this.gameProperties.player2Properties.position).state = "PLAYER_2";

    setTimeout(() => this.addRandomSprite, 1000);
    this.run();
  }

  start() {
    this.gameProperties.player1Properties.position.x = random(MAZE_DIMENSION_X);
    this.gameProperties.player1Properties.position.y = random(MAZE_DIMENSION_Y);
    this.gameProperties.player2Properties.position.x = random(MAZE_DIMENSION_X);
    this.gameProperties.player2Properties.position.y = random(MAZE_DIMENSION_Y);

    this.maze.getCell(this.gameProperties.player1Properties.position).state = "PLAYER_1";

    this.maze.getCell(this.gameProperties.player2Properties.position).state = "PLAYER_2";
  }

  addRandomSprite() {
    setTimeout(this.addRandomSprite.bind(this), 1000 + random(9000));

    if (this.sprites.length < MAX_SPRITES) {
      this.sprites.push(new Sprite(MAZE_DIMENSION_X, MAZE_DIMENSION_Y));
    }
  }

  run() {
    setTimeout(this.run.bind(this), 50);
    if (this.isGameStarted) {
      this.canvas.style.background = "#BFCCF0 url(images/Jaula.png)";

      for (let i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].intersectsH(this.gameProperties)) {
          var pos = this.sprites.indexOf(this.sprites[i]);
          if (pos > -1) {
            this.sprites.splice(pos, 1);
          }
        }
      }

      this.draw(this.graphics, this.gameProperties);
    } else {
      this.canvas.style.background = "#F2FCF0 url(images/JaulaSinAlpha.png)";

      this.graphics.fillStyle = "rgb(0,0,0)";
      this.graphics.font = "bold 25px Arial";
      this.graphics.fillText(
        "Pulsa Enter Para Empezar con el juego de los hamsters",
        30,
        35
      );
      this.graphics.font = "bold 18px Arial";
      this.graphics.fillText(
        "Flechas para hamster marron, (w-a-s-d) para el blanco",
        30,
        200
      );
      this.graphics.fillText(
        "Consigue mas fruta que el otro, hay frutas especiales que te permiten atravesar paredes",
        30,
        400
      );
    }
  }
}

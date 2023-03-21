import { CELL_SIZE, MARGIN_LEFT, MARGIN_TOP } from "../constants/constants";
import { GameProperties, IDrawable } from "./models";
import { Position } from "./Position";

export type Walls = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

export type CellState = "EMPTY" | "PLAYER_1" | "PLAYER_2" | "BOTH";

export class Cell implements IDrawable {
  position: Position;
  walls: Walls;
  state: CellState = "EMPTY";

  constructor(position: Position, walls: Walls) {
    this.position = position;
    this.walls = walls;
  }

  isIntact(): boolean {
    return (this.walls.top == true && this.walls.bottom == true && this.walls.right == true && this.walls.left == true);
  }

  draw(graphics: CanvasRenderingContext2D, gameProperties: GameProperties) {
    if (this.walls.top === true) {
      graphics.moveTo(
        MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE
      );
      graphics.lineTo(
        MARGIN_LEFT + this.position.x + CELL_SIZE + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE
      );
    }
    if (this.walls.bottom === true) {
      graphics.moveTo(
        MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE + CELL_SIZE
      );
      graphics.lineTo(
        MARGIN_LEFT + this.position.x + CELL_SIZE + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE + CELL_SIZE
      );
    }
    if (this.walls.right === true) {
      graphics.moveTo(
        MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE + CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE
      );
      graphics.lineTo(
        MARGIN_LEFT + this.position.x + CELL_SIZE + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE + CELL_SIZE
      );
    }
    if (this.walls.left == true) {
      graphics.moveTo(
        MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE
      );
      graphics.lineTo(
        MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
        MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE + CELL_SIZE
      );
    }
    if (this.state == "PLAYER_1" || this.state == "BOTH") {
      if (!gameProperties.player1Properties.movement) {
        graphics.drawImage(
          gameProperties.player1Properties.sprite,
          47,
          33,
          31,
          31,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player1Properties.movement == "TOP") {
        graphics.drawImage(
          gameProperties.player1Properties.sprite,
          44,
          95,
          30,
          30,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player1Properties.movement == "RIGHT") {
        graphics.drawImage(
          gameProperties.player1Properties.sprite,
          48,
          31,
          29,
          29,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player1Properties.movement == "BOTTOM") {
        graphics.drawImage(
          gameProperties.player1Properties.sprite,
          47,
          63,
          29,
          29,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player1Properties.movement == "LEFT") {
        graphics.drawImage(
          gameProperties.player1Properties.sprite,
          47,
          0,
          31,
          31,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
    if (this.state == "PLAYER_2" || this.state == "BOTH") {
      if (!gameProperties.player2Properties.movement) {
        graphics.drawImage(
          gameProperties.player2Properties.sprite,
          47,
          63,
          29,
          29,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player2Properties.movement == "TOP") {
        graphics.drawImage(
          gameProperties.player2Properties.sprite,
          44,
          95,
          30,
          30,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player2Properties.movement == "RIGHT") {
        graphics.drawImage(
          gameProperties.player2Properties.sprite,
          48,
          31,
          29,
          29,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player2Properties.movement == "BOTTOM") {
        graphics.drawImage(
          gameProperties.player2Properties.sprite,
          47,
          63,
          29,
          29,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else if (gameProperties.player2Properties.movement == "LEFT") {
        graphics.drawImage(
          gameProperties.player2Properties.sprite,
          47,
          0,
          31,
          31,
          MARGIN_LEFT + this.position.x + this.position.x * CELL_SIZE,
          MARGIN_TOP + this.position.y + this.position.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
  }
}

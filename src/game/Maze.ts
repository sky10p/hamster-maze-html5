import {
  isCellImmediatelyToBottomOf,
  isCellImmediatelyToLeftOf,
  isCellImmediatelyToRightOf,
  isCellImmediatelyToTopOf,
} from "../utils/cells.utils";
import { random } from "../utils/random";
import { Cell } from "./Cell";
import { GameProperties, IDrawable } from "./models";
import { Position } from "./Position";

export class Maze implements IDrawable {
  dimensionX: number;
  dimensionY: number;
  visitedCells: number;
  cellStack: Array<Cell>;
  cells: Map<string, Cell>;
  currentCell: any;

  constructor(dimX: number, dimY: number) {
    this.dimensionX = dimX;
    this.dimensionY = dimY;
    this.visitedCells = 1;
    this.cellStack = [];
    this.cells = new Map<string, Cell>();
    this.initialize()
  }
  public draw(
    graphics: CanvasRenderingContext2D,
    gameProperties: GameProperties
  ) {
    graphics.strokeStyle = "rgb(0,0,0)";
    graphics.beginPath();
    for (let i = 0; i < this.dimensionX; i++) {
      for (let j = 0; j < this.dimensionY; j++) {
        this.getCell(new Position(i, j)).draw(graphics, gameProperties);
      }
    }
  }

  private addCell(cell: Cell) {
    this.cells.set(cell.position.hashCode(), cell);
  }

  public getCells(): Array<Cell> {
    return Array.from(this.cells.values());
  }

  public getCell(position: Position): Cell {
    const foundCell = this.cells.get(position.hashCode());
    if (!foundCell) {
      throw new Error(`Cell ${position} not found`);
    }

    return foundCell;
  }

  public initialize() {
    this.visitedCells = 1;
    this.cellStack = [];
    this.cells = new Map<string, Cell>();
    for (let i = 0; i < this.dimensionX; i++) {
      for (let j = 0; j < this.dimensionY; j++) {
        this.addCell(
          new Cell(new Position(i, j), {
            top: true,
            bottom: true,
            left: true,
            right: true,
          })
        );
      }
    }

    this.currentCell = this.getCells()[random(this.cells.size)];
  }

  public getAdjacentCells(position: Position): Array<Cell> {
    const foundAdjacentCells: Cell[] = [];

    if (
      position.y + 1 < this.dimensionY &&
      this.getCell(new Position(position.x, position.y + 1)).isIntact() == true
    ) {
      foundAdjacentCells.push(
        this.getCell(new Position(position.x, position.y + 1))
      );
    }

    if (
      position.x + 1 < this.dimensionX &&
      this.getCell(new Position(position.x + 1, position.y)).isIntact() == true
    ) {
      foundAdjacentCells.push(
        this.getCell(new Position(position.x + 1, position.y))
      );
    }

    if (
      position.y - 1 >= 0 &&
      this.getCell(new Position(position.x, position.y - 1)).isIntact() == true
    ) {
      foundAdjacentCells.push(
        this.getCell(new Position(position.x, position.y - 1))
      );
    }

    if (
      position.x - 1 >= 0 &&
      this.getCell(new Position(position.x - 1, position.y)).isIntact() == true
    ) {
      foundAdjacentCells.push(
        this.getCell(new Position(position.x - 1, position.y))
      );
    }

    return foundAdjacentCells;
  }

  public generate() {
    while (this.visitedCells < this.cells.size) {
      const adjacentCells = this.getAdjacentCells(this.currentCell.position);
      if (adjacentCells.length > 0) {
        const auxCell = adjacentCells[random(adjacentCells.length)];
        this.breakWall(this.currentCell, auxCell);

        this.cellStack.push(this.currentCell);
        this.currentCell = auxCell;
        this.visitedCells++;
      } else {
        this.currentCell = this.cellStack.pop();
      }
    }
  }

  public breakWall = (cell1: Cell, cell2: Cell) => {
    if (isCellImmediatelyToLeftOf(cell1, cell2)) {
      this.getCell(cell1.position).walls.right = false;
      this.getCell(cell2.position).walls.left = false;
    }

    if (isCellImmediatelyToRightOf(cell1, cell2)) {
      this.getCell(cell1.position).walls.left = false;
      this.getCell(cell2.position).walls.right = false;
    }

    if (isCellImmediatelyToTopOf(cell1, cell2)) {
      this.getCell(cell1.position).walls.bottom = false;
      this.getCell(cell2.position).walls.top = false;
    }

    if (isCellImmediatelyToBottomOf(cell1, cell2)) {
      this.getCell(cell1.position).walls.top = false;
      this.getCell(cell2.position).walls.bottom = false;
    }
  };
}

import { Maze } from "../Maze";
import { Position } from "../Position";

describe("Maze", () => {
  describe("getCell", () => {
    it("should throw an error when cell is not found", () => {
      const maze = new Maze(2, 2);
      expect(() => maze.getCell(new Position(3, 3))).toThrow(
        "Cell [3,3] not found"
      );
    });

    it("should return the correct cell", () => {
      const maze = new Maze(2, 2);
      const cell = maze.getCell(new Position(1, 1));
      expect(cell.position.x).toBe(1);
      expect(cell.position.y).toBe(1);
    });
  });

  describe("getAdjacentCells", () => {
    it("should return the adjacent cells of the specified position", () => {
      const maze = new Maze(3, 3);
      const cells = maze.getAdjacentCells(new Position(1, 1));
      expect(cells.length).toBe(4);
      expect(cells.some((c) => c.position.x === 1 && c.position.y === 2)).toBe(
        true
      );
      expect(cells.some((c) => c.position.x === 2 && c.position.y === 1)).toBe(
        true
      );
      expect(cells.some((c) => c.position.x === 1 && c.position.y === 0)).toBe(
        true
      );
      expect(cells.some((c) => c.position.x === 0 && c.position.y === 1)).toBe(
        true
      );
    });

    it("should return only intact cells", () => {
      const maze = new Maze(3, 3);
      maze.getCell(new Position(1, 2)).walls.bottom = false;
      const cells = maze.getAdjacentCells(new Position(1, 1));
      expect(cells.length).toBe(3);
      expect(cells.some((c) => c.position.x === 1 && c.position.y === 2)).toBe(
        false
      );
    });
  });

  describe("breakWall", () => {
    it("should break the wall between two adjacent cells", () => {
      const maze = new Maze(2, 2);
      const cell1 = maze.getCell(new Position(0, 0));
      const cell2 = maze.getCell(new Position(0, 1));
      maze.breakWall(cell1, cell2);
      expect(cell1.walls.bottom).toBe(false);
      expect(cell2.walls.top).toBe(false);
    });
  });

  describe("generate", () => {
    it("should generate a valid maze", () => {
      const maze = new Maze(30, 15);
      maze.generate();

      const cells = maze.getCells();

      // Verifica que todas las celdas han sido visitadas
      expect(maze.visitedCells).toBe(maze.cells.size);


      const cellsWalls = cells.map((cell) => { return {cell: cell, validatedWalls: cell.validateWalls()}});
      expect(cells.every((cell) => cell.validateWalls())).toBe(true);

    });
  });


});

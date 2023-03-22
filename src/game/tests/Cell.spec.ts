import { Cell, Walls } from "../Cell";
import { Position } from "../Position";

describe("Cell", () => {
  const walls: Walls = {
    top: true,
    right: true,
    bottom: true,
    left: true,
  };

  const position = new Position(0, 0);

  test("constructor sets properties correctly", () => {
    const cell = new Cell(position, walls);
    expect(cell.position).toEqual(position);
    expect(cell.walls).toEqual(walls);
    expect(cell.state).toEqual("EMPTY");
  });

  test("isIntact returns true for intact walls", () => {
    const intactCell = new Cell(position, walls);
    expect(intactCell.isIntact()).toBe(true);
  });

  test("isIntact returns false for broken walls", () => {
    const brokenWalls: Walls = {
      top: true,
      right: true,
      bottom: false,
      left: true,
    };
    const brokenCell = new Cell(position, brokenWalls);
    expect(brokenCell.isIntact()).toBe(false);
  });

  describe("validateWalls", () => {
    test("should return true when there is one broken wall and three intact walls", () => {
      const walls = {
        top: true,
        right: false,
        bottom: true,
        left: true,
      };

      const cell = new Cell(new Position(0, 0), walls);
      const result = cell.validateWalls();
      expect(result).toBe(true);
    });

    test("should return false when there is more than one broken wall", () => {
      const walls = {
        top: true,
        right: false,
        bottom: false,
        left: true,
      };

      const cell = new Cell(new Position(0, 0), walls);
      const result = cell.validateWalls();
      expect(result).toBe(true);
    });

    test("should return false when there are no broken walls", () => {
      const walls = {
        top: true,
        right: true,
        bottom: true,
        left: true,
      };

      const cell = new Cell(new Position(0, 0), walls);
      const result = cell.validateWalls();
      expect(result).toBe(false);
    });

    test("should return false when there are more than three walls", () => {
      const walls = {
        top: true,
        right: false,
        bottom: true,
        left: true,
      };

      const cell = new Cell(new Position(0, 0), walls);
      const result = cell.validateWalls();
      expect(result).toBe(true);
    });
  });
});

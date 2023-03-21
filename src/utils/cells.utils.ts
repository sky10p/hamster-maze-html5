import { Cell } from "../game/Cell";

export const isCellImmediatelyToLeftOf = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.position.x  ===  cell2.position.x - 1;
}

export const isCellImmediatelyToRightOf = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.position.x  ===  cell2.position.x + 1;
}

export const isCellImmediatelyToTopOf = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.position.y  ===  cell2.position.y - 1;
}

export const isCellImmediatelyToBottomOf = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.position.y  ===  cell2.position.y + 1;
}
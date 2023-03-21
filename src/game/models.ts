export type Position = {
    x: number,
    y: number
}

export type Movement = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'

export type PlayerProperties = {
    movement?: Movement;
    position: Position;
    sprite: HTMLImageElement;
    score: number;
    wallsCanJump: number;
}

export type GameProperties = {
    player1Properties: PlayerProperties;
    player2Properties: PlayerProperties;
}

export interface IDrawable{
    draw: (graphics: CanvasRenderingContext2D, gameProperties: GameProperties) => void;
}
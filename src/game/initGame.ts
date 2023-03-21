import { Game } from "./Game";
import { GameProperties } from "./models";

export const initGame = () => {

    const spritePlayer1 = new Image();
    const spritePlayer2 = new Image();
    spritePlayer1.src = "images/hamster.png";
    spritePlayer2.src = "images/hamster_blanco.png"


    const gameProperties: GameProperties = {
        player1Properties: {
            score: 0,
            sprite: spritePlayer1,
            wallsCanJump: 0,
            position: {x: 0,y:0}
        },
        player2Properties: {
            score: 0,
            sprite: spritePlayer2,
            wallsCanJump: 0,
            position: {x: 0,y:0}
        }
    }

    const game = Game.createGame("canvas", gameProperties);
     game.init();
}


import { CELL_SIZE, MARGIN_LEFT, MARGIN_TOP } from "../constants/constants";
import { random } from "../utils/random";
import { GameProperties, IDrawable } from "./models";

export class Sprite implements IDrawable {
    x: number;
    y: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
    type: number;
    image: HTMLImageElement;
    wallsJumpPowerup: number;

    
    constructor(dimensionMazeX: number, dimensionMazeY: number) {
        this.x = (random(dimensionMazeX));
        this.y = random(dimensionMazeY);
        this.type = random(7);
        this.image = new Image();
        if (this.type >= 0 && this.type <= 5) {
            this.image.src = 'images/frutas.png';
            this.wallsJumpPowerup = 0;
            this.posX = 21 + random(3) * 175;
            this.posY = 58 + random(2) * 175;
            this.width = 175;
            this.height = 175;
        }
        else {



            this.image.src = 'images/rueda.png';
            this.wallsJumpPowerup = 1 + random(9);
            this.posX = 0;
            this.posY = 0;
            this.width = 302;
            this.height = 302;

        }

    }
    draw(graphics: CanvasRenderingContext2D) {
        graphics.drawImage(this.image, this.posX, this.posY, this.width, this.height, MARGIN_LEFT + this.x + (this.x * CELL_SIZE), MARGIN_TOP + this.y + (this.y * CELL_SIZE), CELL_SIZE, CELL_SIZE);
    };

    
    intersectsH(gameProperties: GameProperties) : boolean {
        var result = false;
        if (this.x == gameProperties.player1Properties.position?.x && this.y == gameProperties.player1Properties.position.y) {
            gameProperties.player1Properties.score++;
            gameProperties.player1Properties.wallsCanJump += this.wallsJumpPowerup;
            result = true;
        }
        if (this.x == gameProperties.player2Properties.position.x && this.y == gameProperties.player2Properties.position.y) {
            gameProperties.player2Properties.score++;
            gameProperties.player2Properties.wallsCanJump += this.wallsJumpPowerup;
            result = true;
        }

        return result;
    };

    intersects(sprite: Sprite): boolean {
        if (sprite != null) {
            return (this.x == sprite.x && this.y == sprite.y);
        }

        return false;
    };

}
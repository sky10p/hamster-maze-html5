import { Game } from "./Game";
import { Position } from "./Position";

export const registerKeyLoggers = (game: Game) => {
    document.addEventListener('keydown', function(evt) {
        const lastKey = evt.keyCode;
    
        if (game.isGameStarted == true) {
            const maze = game.maze;
            const player1 = game.gameProperties.player1Properties;
            if (lastKey == 38 && (maze.getCell(player1.position).walls.top == false || player1.wallsCanJump > 0)) { //Arriba
                player1.movement = "TOP";
    
                if (maze.getCell(new Position(player1.position.x, player1.position.y- 1)).state != "PLAYER_2") {
                    if (maze.getCell(player1.position).state != "BOTH")
                    maze.getCell(player1.position).state = "EMPTY";
                    else
                    maze.getCell(player1.position).state = "PLAYER_2";
                    maze.getCell(new Position(player1.position.x, player1.position.y- 1)).state = "PLAYER_1";
    
                }
                else {
                    maze.getCell(player1.position).state = "EMPTY";
                    maze.getCell(new Position(player1.position.x, player1.position.y -1)).state = "BOTH";
    
                }
                if (maze.getCell(player1.position).walls.top == true)
                    player1.wallsCanJump--;
                player1.position.y--;
            }
    
    
    
            if (lastKey == 39 && (maze.getCell(player1.position).walls.right == false || player1.wallsCanJump > 0)) { //Derecha
                player1.movement = "RIGHT";
                
                if (maze.getCell(new Position(player1.position.x+1, player1.position.y)).state != "PLAYER_2") {
                    if (maze.getCell(player1.position).state != "BOTH")
                    maze.getCell(player1.position).state = "EMPTY";
                    else
                    maze.getCell(player1.position).state = "PLAYER_2";
                    maze.getCell(new Position(player1.position.x+1, player1.position.y)).state = "PLAYER_1";
    
                }
                else {
                    maze.getCell(player1.position).state = "EMPTY";
                    maze.getCell(new Position(player1.position.x+1, player1.position.y)).state = "BOTH";
    
                }
                if (maze.getCell(player1.position).walls.right == true)
                
                    player1.wallsCanJump--;
                player1.position.x++;
            }
            
            if (lastKey == 40 && (maze.getCell(player1.position).walls.bottom == false || player1.wallsCanJump > 0)) { //Abajo
                player1.movement = "BOTTOM";
                
                if (maze.getCell(new Position(player1.position.x, player1.position.y+1)).state != "PLAYER_2") {
                    if (maze.getCell(player1.position).state != "BOTH")
                        maze.getCell(player1.position).state = "EMPTY";
                    else
                        maze.getCell(player1.position).state = "PLAYER_2";
                    maze.getCell(new Position(player1.position.x, player1.position.y+1)).state = "PLAYER_1";
    
                }
                else {
                    maze.getCell(player1.position).state = "EMPTY";
                    maze.getCell(new Position(player1.position.x, player1.position.y+1)).state = "BOTH";
    
                }
                if (maze.getCell(player1.position).walls.bottom == true)
                    player1.wallsCanJump--;
                player1.position.y++;
    
            }
            if (lastKey == 37 && (maze.getCell(player1.position).walls.left == false || player1.wallsCanJump > 0)) { //Izquierda
                player1.movement = "LEFT";
                if (maze.getCell(new Position(player1.position.x-1, player1.position.y)).state != "PLAYER_2") {
                    if (maze.getCell(player1.position).state != "BOTH")
                        maze.getCell(player1.position).state = "EMPTY";
                    else
                        maze.getCell(player1.position).state = "PLAYER_2";
                    maze.getCell(new Position(player1.position.x-1, player1.position.y)).state = "PLAYER_1";
    
                }
                else {
                    maze.getCell(player1.position).state = "EMPTY";
                    maze.getCell(new Position(player1.position.x-1, player1.position.y)).state = "BOTH";
    
                }
                if (maze.getCell(player1.position).walls.left == true)
                    player1.wallsCanJump--;
                player1.position.x--;
    
            }
            // 87w 65a 83s 68d
            if (lastKey == 87 && (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).N == 0 || paredes2 > 0)) { //Arriba
                movimientoPLAYER_2 = "ARRIBA";
    
                if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y - 1).state != "PLAYER_1") {
                    if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state != "BOTH")
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    else
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "PLAYER_1";
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y - 1).state = "PLAYER_2";
    
                }
                else {
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y - 1).state = "BOTH";
    
                }
                if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).N == 1)
                    paredes2--;
                PLAYER_2y--;
            }
    
    
    
            if (lastKey == 68 && (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).E == 0 || paredes2 > 0)) { //Derecha
                movimientoPLAYER_2 = "DERECHA";
                if (celdas.getCeldaAt(PLAYER_2x + 1, PLAYER_2y).state != "PLAYER_1") {
                    if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state != "BOTH")
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    else
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "PLAYER_1";
                    celdas.getCeldaAt(PLAYER_2x + 1, PLAYER_2y).state = "PLAYER_2";
    
                }
                else {
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    celdas.getCeldaAt(PLAYER_2x + 1, PLAYER_2y).state = "BOTH";
    
                }
                if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).E == 1)
                    paredes2--;
                PLAYER_2x++;
            }
            if (lastKey == 83 && (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).walls.bottom == 0 || paredes2 > 0)) { //Abajo
                movimientoPLAYER_2 = "BOTTOM";
                if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y + 1).state != "PLAYER_1") {
                    if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state != "BOTH")
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    else
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "PLAYER_1";
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y + 1).state = "PLAYER_2";
    
                }
                else {
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y + 1).state = "BOTH";
    
                }
                if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).walls.bottom == 1)
                    paredes2--;
                PLAYER_2y++;
    
            }
            if (lastKey == 65 && (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).O == 0 || paredes2 > 0)) { //Izquierda
                movimientoPLAYER_2 = "LEFT";
                if (celdas.getCeldaAt(PLAYER_2x - 1, PLAYER_2y).state != "PLAYER_1") {
                    if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state != "BOTH")
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    else
                        celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "PLAYER_1";
                    celdas.getCeldaAt(PLAYER_2x - 1, PLAYER_2y).state = "PLAYER_2";
    
                }
                else {
                    celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).state = "EMPTY";
                    celdas.getCeldaAt(PLAYER_2x - 1, PLAYER_2y).state = "BOTH";
    
                }
                if (celdas.getCeldaAt(PLAYER_2x, PLAYER_2y).O == 1)
                    paredes2--;
                PLAYER_2x--;
    
            }
        }
    
        if (lastKey == 13) { //Enter
            PartidaEmpezada = true;
    
            lastKey = null;
        }
    
        if (lastKey == 90) {
            paredes2 += 10;
        }
    
        if (lastKey == 107) {
            player1.wallsCanJump += 10;
        }
    
    
    
    
    
    }, false);
    
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
}
import { Game } from "./Game";
import { Position } from "./Position";

export const registerKeyLoggers = (game: Game) => {
    document.addEventListener('keydown', function(evt) {
        const lastKey = evt.keyCode;
        const maze = game.maze;
        const player1 = game.gameProperties.player1Properties;
        const player2 = game.gameProperties.player2Properties;
        if (game.isGameStarted == true) {
            
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
            
            if (lastKey == 87 && (maze.getCell(player2.position).walls.top == false || player2.wallsCanJump > 0)) { //Arriba
                player2.movement = "TOP";
    
                if (maze.getCell(new Position(player2.position.x, player2.position.y-1)).state != "PLAYER_1") {
                    if (maze.getCell(player2.position).state != "BOTH")
                        maze.getCell(player2.position).state = "EMPTY";
                    else
                        maze.getCell(player2.position).state = "PLAYER_1";
                    maze.getCell(new Position(player2.position.x, player2.position.y-1)).state = "PLAYER_2";
    
                }
                else {
                    maze.getCell(player2.position).state = "EMPTY";
                    maze.getCell(new Position(player2.position.x, player2.position.y-1)).state = "BOTH";
    
                }
                if (maze.getCell(player2.position).walls.top == true)
                    player2.wallsCanJump--;
                player2.position.y--;
            }
    
    
    
            if (lastKey == 68 && (maze.getCell(player2.position).walls.right == false || player2.wallsCanJump > 0)) { //Derecha
                player2.movement = "RIGHT";
                if (maze.getCell(new Position(player2.position.x+1, player2.position.y)).state != "PLAYER_1") {
                    if (maze.getCell(player2.position).state != "BOTH")
                        maze.getCell(player2.position).state = "EMPTY";
                    else
                        maze.getCell(player2.position).state = "PLAYER_1";
                    maze.getCell(new Position(player2.position.x+1, player2.position.y)).state = "PLAYER_2";
    
                }
                else {
                    maze.getCell(player2.position).state = "EMPTY";
                    maze.getCell(new Position(player2.position.x+1, player2.position.y)).state = "BOTH";
    
                }
                if (maze.getCell(player2.position).walls.right == true)
                    player2.wallsCanJump--;
                player2.position.x++;
            }
            if (lastKey == 83 && (maze.getCell(player2.position).walls.bottom == false || player2.wallsCanJump > 0)) { //Abajo
                player2.movement = "BOTTOM";
                if (maze.getCell(new Position(player2.position.x, player2.position.y+1)).state != "PLAYER_1") {
                    if (maze.getCell(player2.position).state != "BOTH")
                        maze.getCell(player2.position).state = "EMPTY";
                    else
                        maze.getCell(player2.position).state = "PLAYER_1";
                    maze.getCell(new Position(player2.position.x, player2.position.y+1)).state = "PLAYER_2";
    
                }
                else {
                    maze.getCell(player2.position).state = "EMPTY";
                    maze.getCell(new Position(player2.position.x, player2.position.y+1)).state = "BOTH";
    
                }
                if (maze.getCell(player2.position).walls.bottom == true)
                    player2.wallsCanJump--;
                player2.position.y++;
    
            }
            if (lastKey == 65 && (maze.getCell(player2.position).walls.left == false || player2.wallsCanJump > 0)) { //Izquierda
                player2.movement = "LEFT";
                if (maze.getCell(new Position(player2.position.x-1, player2.position.y)).state != "PLAYER_1") {
                    if (maze.getCell(player2.position).state != "BOTH")
                        maze.getCell(player2.position).state = "EMPTY";
                    else
                        maze.getCell(player2.position).state = "PLAYER_1";
                    maze.getCell(new Position(player2.position.x-1, player2.position.y)).state = "PLAYER_2";
    
                }
                else {
                    maze.getCell(player2.position).state = "EMPTY";
                    maze.getCell(new Position(player2.position.x-1, player2.position.y)).state = "BOTH";
    
                }
                if (maze.getCell(player2.position).walls.left == true)
                    player2.wallsCanJump--;
                player2.position.x--;
    
            }
        }
    
        if (lastKey == 13) { //Enter
            game.isGameStarted = true;
        }
    
        if (lastKey == 90) {
            player2.wallsCanJump += 10;
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
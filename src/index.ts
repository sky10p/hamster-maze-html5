import { initGame } from "./game";
import { Game } from "./game/Game";

let game: Game;

window.addEventListener('load', () => {
    game = initGame();
}, false);


document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('btnStart');
    if(startButton) {
        startButton.addEventListener('click', () => {
            game.start();
        });
    }
});

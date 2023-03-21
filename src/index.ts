import { initGame } from "./game";

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('btnStart');
    if(startButton) {
        startButton.addEventListener('click', initGame);
    }
});

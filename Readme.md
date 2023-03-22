# Hamseter Maze HTML5 Game

This project, "hamster-maze-html5", is a simple, yet fun, maze game implemented in TypeScript and HTML5 using the canvas API. The game features two hamsters competing to collect more fruits than the other player within the maze. In addition to fruits, a special wheel can appear that allows the hamster to temporarily pass through walls.

The game is designed for two players but also serves as a foundation for the implementation of AI algorithms (A*, neural networks, etc.) to enable one of the hamsters to move autonomously.

## Gameplay

Two hamsters are placed in a randomly generated maze, and the objective is to collect more fruits than the other player. The game features a special wheel that, when collected, allows the hamster to pass through walls for a limited time.

### Controls

* Player 1:

    * Move Up: Arrow Up
    * Move Down: Arrow Down
    * Move Left: Arrow Left
    * Move Right: Arrow Right

* Player 2:

    * Move Up: W
    * Move Down: S
    * Move Left: A
    * Move Right: D

## Getting Started

Follow these instructions to get the game running on your local machine.

### Prerequisites

* Node.js
* yarn

### Installation

1. Clone the repository

```bash
git clone git@github.com:sky10p/hamster-maze-html5.git
```

2. Change directory to the project folder

```bash
cd hamster-maze-html5
```

3. Install the neccessary dependencies

```
yarn install
```

4. Start the development server:

```sql
yarn start
```

5. Open your browser and navigate to **http://localhost:8080** to start playing the game.

## Future Development

The project aims to incorporate various AI algorithms to make one of the hamsters move autonomously, transforming it into a single-player game with an AI opponent. Some possible AI implementations include A* pathfinding, neural networks, and other machine learning techniques.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or new features you'd like to see in the game. Contributions are always welcome!

## License

This project is licensed under the MIT License

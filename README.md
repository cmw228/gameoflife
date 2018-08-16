Conway's Game of Life

This project was bootstrapped with Create React App (https://github.com/facebookincubator/create-react-app).


To run the game, in the project directory run
```
  yarn install
  yarn start
```
(or if you don't have yarn):
```
  npm install
  npm start
```
This will run it on http://localhost:3000


An optimized build can be created with
```
  yarn build
```

The meat of the logic is in GameContainer.js, the parent component for
the game. Refer the comments there for more details.

Game.js is a stateless component which contains only JSX for the UI.

Grid.js maps the cell array to an array of Cell components (Cell.js), and renders
them.

And thats about it...

I wrote a short reflection on my thought process while developing the
game, (Reflection.txt) I recommended reading that before going through the code. :)

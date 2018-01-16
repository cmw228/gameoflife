Diary

-create the grid
-make a component for a single cell. its state can be alive or dead
-separate the logic from the ui with the GridContainer component
-for each generation, set the state for the Grid, which contain the data
for all the cells
-we need to know every cell's next state before it rerenders the grid
-create a cell object map for fast cell lookups (since we need to do 8
per cell for every generation)

Diary

-create the grid

-make a component for a single cell. its state can be alive or dead

-separate the logic from the ui with the GridContainer component

-for each generation, set the state for the Grid, which contain the data
for all the cells

-we need to know every cell's next state before it rerenders the grid

-create a cell object map for fast cell lookups but keep the array to
maintain the order of the cells

-the game component is the parent for all the game controls and visual
components

-changing the cols or rows state effects the calls to next generation.
disable controls while running?


-boundary condition toggle occurs instantly, while changes to size and
density require you to click 'apply'

-goal: simplify by applying all changes instantly, or on clicking apply,
and disabling controls while running

-simplify by giving the user set options for size, speed, and density to prevent
bad performance by the user entering in large values. Also easier than
managing any possible user input


next iteration:
-maybe make the chances of a cell being alive, when rendered, equal to
the density. can probably use a life cycle hook for this.

-remember to disable controls when running



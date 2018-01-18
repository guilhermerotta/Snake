# Installation

No installation needed. Just open the index.html file on Chrome.

# Observations

It took me around 4 hours between coding and documentation.
I didn't have time to implement the collision with the snake's own body.

# Known issues

Besides detecting collision with the snake's own body, as specified above,
it is possible that the food be rendered in a spot currently occupied by a
cell of the snake's body. It would make sense to test that before rendering
the food.

It would also be interesting to automatically detect the snake body's cell's
width from within the script, because as it is today the CSS property and the
constant in the script must match.

# Next Steps

These are the features I would like to implement next:

* More initialization options, such as board width and height
* Buttons to restart and pause the game

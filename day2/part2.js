const fs = require('fs');

const getInput =  () => {
    let data = null;
    try {
        data = fs.readFileSync('./input.txt', 'utf8'); 
        return data;
    } catch(err) {
        console.error(err);
        return;
    }
};

/**
  * down X increases your aim by X units.
  * up X decreases your aim by X units.
  * forward X does two things:
  * It increases your horizontal position by X units.
  * It increases your depth by your aim multiplied by X.
  */

const main = () => {
    const data = getInput();

    const moves = data.split('\n').map((row) => {
        const [direction, movement] = row.split(' ');
        return {direction, movement: parseInt(movement, 10)}
    });

    let horizontalPosition = 0;
    let verticalDepth = 0;
    let aim = 0;
    moves.forEach(({direction, movement}) => {
        if (direction === `forward`) {
            horizontalPosition += movement;
            verticalDepth += aim * movement;
        }

        if (direction === `down`) {
            aim += movement;
        }
        
        if (direction === `up`) {
            aim -= movement;
        }
    });

    console.log(`total: ${horizontalPosition * verticalDepth}`);
};

main();
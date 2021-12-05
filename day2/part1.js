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


const main = () => {
    const data = getInput();

    const moves = data.split('\n').map((row) => {
        const [direction, movement] = row.split(' ');
        return {direction, movement: parseInt(movement, 10)}
    });

    let horizontalDepth = 0;
    let verticalDepth = 0;
    moves.forEach(({direction, movement}) => {
        if (direction === `forward`) {
            horizontalDepth += movement;
        }

        if (direction === `down`) {
            verticalDepth += movement;
        }
        
        if (direction === `up`) {
            verticalDepth -= movement;
        }
    });

    console.log(`total: ${horizontalDepth * verticalDepth}`);
};

main();
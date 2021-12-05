const fs = require('fs');

const getInput =  () => {
    let data = null;
    try {
        data = fs.readFileSync('/Users/emmett/Desktop/advent-of-code/day1/input.txt', 'utf8'); 
        return data;
    } catch(err) {
        console.error(err);
        return;
    }
};


const main = () => {
    const data = getInput();


    const numbers = data.split('\n').map((x) => {
        return parseInt(x, 10);
    });
    console.log(numbers[0])
    console.log(numbers[1]);

    let total = 0;
    for (let i = 1; i < numbers.length; i++) {
        const prevNumber = numbers[i-1];
        const currNumber = numbers[i];

        if (currNumber > prevNumber) {
            total += 1;
        }
    }
    console.log(`total: ${total}`);
};

main();
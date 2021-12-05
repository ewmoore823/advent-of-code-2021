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

    console.log(numbers.length)

    let total = 0;
    for (let i = 3; i < numbers.length; i++) {
        const a1 = numbers[i-3];
        const a2 = numbers[i-2];
        const a3 = numbers[i-1];
        const a4 = numbers[i];

        const avg1 = (a1 + a2 + a3) / 3;
        const avg2 = (a2 + a3 + a4) / 3;
        if (avg2 > avg1) {
            total += 1;
        }
    }
    console.log(`total: ${total}`);
};

main();
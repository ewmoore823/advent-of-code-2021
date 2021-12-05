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

    const count = new Array(12).fill(0)

    const rows = data.split('\n').map((row) => {
        const bits = row.split(``);
        return bits.map((bit) => {
            return parseInt(bit, 10);
        });
    });

    rows.forEach((row) => {
        for (let i = 0; i < row.length; i+= 1) {
            if (row[i] === 1) {
                count[i] += 1;
            }
            if (row[i] === 0) {
                count[i] -= 1;
            }
        }
    });

    console.log(count)

    const epsilonCount = count.map((x) => {
        return x < 0 ? 1 : 0;
    })

    const gammaCount = count.map((x) => {
        return x < 0 ? 0 : 1;
    })


    let epsilon = 0;
    let epsilonFactor = 1;
    epsilonCount.reverse().forEach((e) => {
        epsilon += e * epsilonFactor;
        epsilonFactor *= 2;
    });

    let gamma = 0;
    let gammaFactor = 1;
    gammaCount.reverse().forEach((e) => {
        gamma += e * gammaFactor;
        gammaFactor *= 2;
    });

    console.log(`epsilon: ${epsilon} `);
    console.log(`gamma: ${gamma} `);
    console.log(`ret: ${gamma * epsilon}`)
};

main();
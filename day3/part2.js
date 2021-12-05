const fs = require('fs');

const binaryArrayToDecimal = (binaryArray) => {
    let decimalValue = 0;
    let epsilonFactor = 1;
    binaryArray.reverse().forEach((e) => {
        decimalValue += e * epsilonFactor;
        epsilonFactor *= 2;
    });

    return decimalValue;
}

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

const getMostCommonBitsForIndex = (rows, index) => {
    let zeroCount = 0;
    let oneCount = 0;
    rows.forEach((c) => {
        if (c[index] > 0) {
            oneCount += 1;
        } else {
            zeroCount += 1;
        }
    });

    if (zeroCount > oneCount) {
        return 0;
    }

    if (oneCount > zeroCount) {
        return 1;
    }

    console.log(`NULL`)
    return null;
}

const getCo2Rating = (rows) => {
    let co2EligibleRows = rows.slice();
    console.log(`getOxygenRating`);
    console.log(`co2EligibleRows.length`);
    console.log(co2EligibleRows.length);
    

    let currentIndex = 0;
    while (currentIndex < rows[0].length) {

        const mostCommonBitAtIndex = getMostCommonBitsForIndex(co2EligibleRows, currentIndex);
        console.log(`mostcommon: ${mostCommonBitAtIndex}`)

        const x = co2EligibleRows.filter((row) => {
            if (mostCommonBitAtIndex === null) {
                return row[currentIndex] === 0;
            }
            return row[currentIndex] !== mostCommonBitAtIndex;
        })

        co2EligibleRows = x;

        if (co2EligibleRows.length === 1) {
            break;
        }

        currentIndex += 1;
    }

    return co2EligibleRows[0];


}
const getOxygenRating = (rows) => {
    let oxygenEligibleRows = rows.slice();
    console.log(`getOxygenRating`);
    console.log(`oxygenEligibleRows.length`)
    console.log(oxygenEligibleRows.length)


    let currentIndex = 0;
    while (currentIndex < rows[0].length) {
    
        const mostCommonBitAtIndex = getMostCommonBitsForIndex(oxygenEligibleRows, currentIndex);

        const x = oxygenEligibleRows.filter((row) => {
            if (mostCommonBitAtIndex === null) {
                return row[currentIndex] === 1;
            }

            return row[currentIndex] === mostCommonBitAtIndex;
        })

        oxygenEligibleRows = x;

        if (oxygenEligibleRows.length === 1) {
            break;
        }

        currentIndex += 1;
    }

    return oxygenEligibleRows[0];


}
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

    const oxygenRating = getOxygenRating(rows);
    const co2Rating = getCo2Rating(rows);

    console.log(`o2: ${oxygenRating}`)
    console.log(`co2: ${co2Rating}`)

    const o2Decimal = binaryArrayToDecimal(oxygenRating);
    const co2Decimal = binaryArrayToDecimal(co2Rating);

    console.log(`o2: ${o2Decimal}`)
    console.log(`co2: ${co2Decimal}`)

    console.log(`ret: ${co2Decimal * o2Decimal}`)
};

main();
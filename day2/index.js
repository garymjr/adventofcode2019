const readInput = require('../utils/readInput')
const test = require('../utils/test')
const getResult = require('../utils/getResult')

class Day2 {
  part1(input, test = false) {
    const intcode = input[0].split(',').map(n => Number(n))

    // apply 1202 program alarm
    if (!test) {
      intcode[1] = 12
      intcode[2] = 2
    }

    for (let i = 0; i < intcode.length; i += 4) {
      const [optCode, pos1, pos2, output] = intcode.slice(i, i + 4)

      // stop if we receive a halt code or an invalid code
      if (optCode === 99 || [1, 2, 99].indexOf(optCode) === -1) break;

      if (optCode === 1) {
        intcode[output] = intcode[pos1] + intcode[pos2]
      } else if (optCode === 2) {
        intcode[output] = intcode[pos1] * intcode[pos2]
      }
    }

    return intcode[0]
  }

}

}

}

const day2 = new Day2()

test(day2.part1(['1,0,0,0,99'], true), 2)
test(day2.part1(['2,3,0,3,99'], true), 2)
test(day2.part1(['2,4,4,5,99,0'], true), 2)
test(day2.part1(['1,1,1,4,99,5,6,0,99'], true), 30)
getResult(day2.part1(readInput('./day2/input.txt')))

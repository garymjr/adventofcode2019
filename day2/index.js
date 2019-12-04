const readInput = require('../utils/readInput')
const test = require('../utils/test')
const getResult = require('../utils/getResult')

class Day2 {
  memory = []

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

  runOptCodeInMemory(optCode, pos1, pos2, output) {
    for (let i = 0; i < this.memory.length; i += 4) {
      // stop if we receive a halt code or an invalid code
      if (optCode === 99 || [1, 2, 99].indexOf(optCode) === -1) {
        break
      }

      if (optCode === 1) {
        this.memory[output] = this.memory[pos1] + this.memory[pos2]
      } else if (optCode === 2) {
        this.memory[output] = this.memory[pos1] * this.memory[pos2]
      }
    }

    return this.memory
  }

  part2(input, expected, test = false) {
    const intcode = input[0].split(',').map(n => Number(n))

    // apply 1202 program alarm
    if (!test) {
      intcode[1] = 12
      intcode[2] = 2
    }

    this.memory = intcode.slice()
    for (let i = 0; i < this.memory.length; i += 4) {
      const [optCode, pos1, pos2, output] = this.memory.slice(i, i + 4)

      // stop if we receive a halt code or an invalid code
      if (optCode === 99 || [1, 2, 99].indexOf(optCode) === -1) {
        break
      }

      const result = this.runOptCodeInMemory(optCode, pos1, pos2, output)
      if (result[0] === expected) {
        return 100 * pos1 + pos2
      }

      this.memory = intcode.slice()
    }
  }
}

const day2 = new Day2()

test(day2.part1(['1,0,0,0,99'], true), 2)
test(day2.part1(['2,3,0,3,99'], true), 2)
test(day2.part1(['2,4,4,5,99,0'], true), 2)
test(day2.part1(['1,1,1,4,99,5,6,0,99'], true), 30)
getResult(day2.part1(readInput('./day2/input.txt')))

test(day2.part2(['1,12,2,0,1,1,1,1,1,1,1,1,2,99'], 4, true), 1202)
getResult(day2.part2(readInput('./day2/input.txt'), 19690720))

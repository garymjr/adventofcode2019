const readInput = require('../utils/readInput')
const test = require('../utils/test')
const getResult = require('../utils/getResult')

class Day4 {
  part1(input) {
    const [start, end] = input[0].split('-').map(Number)
    console.log('start')
    for (let i = start; i <= end; i++) {
      if (!this.checkRules(i)) continue
      console.log(i)
    }
    console.log('end')
  }

  checkRules(n) {
    const nStr = n.toString()

    let pass = true
    for (let i = 0; i < nStr.length; i++) {
      // Check for increase
      for (let j = i; j < nStr.length; j++) {
        if (j === i) continue
        pass = nStr[j] <= nStr[i]
        if (!pass) return false
      }
      if (!pass) return false
    }
    return pass
  }
}

const day4 = new Day4()

getResult(day4.part1(readInput('./day4/input.txt')))

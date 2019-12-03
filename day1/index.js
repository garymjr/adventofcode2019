const readInput = require('../utils/readInput')
const test = require('../utils/test')
const getResult = require('../utils/getResult')

class Day1 {
  part1(input) {
    const sumOfFuel = input.reduce((total, module) => {
      const mass = Number(module)
      const fuelRequired = Math.floor(mass / 3) - 2
      return total + fuelRequired
    }, 0)
    return sumOfFuel
  }

  part2(input) {
    const sumOfFuel = input.reduce((total, module) => {
      const mass = Number(module)
      const fuelRequired = this.calculateFuelRequired(Math.floor(mass / 3) - 2)
      return total + fuelRequired
    }, 0)
    return sumOfFuel
  }

  calculateFuelRequired(fuel, fuelRequiredForFuel = fuel) {
    fuelRequiredForFuel = Math.floor(fuelRequiredForFuel / 3) - 2
    if (fuelRequiredForFuel <= 0) {
      return fuel
    }
    return this.calculateFuelRequired(fuel + fuelRequiredForFuel, fuelRequiredForFuel)
  }
}

const day1 = new Day1()

// part1 tests
test(day1.part1(['12']), 2)
test(day1.part1(['14']), 2)
test(day1.part1(['1969']), 654)
test(day1.part1(['100756']), 33583)
getResult(day1.part1(readInput('./day1/input.txt')))

// part2 tests
test(day1.part2(['14']), 2)
test(day1.part2(['1969']), 966)
test(day1.part2(['100756']), 50346)
getResult(day1.part2(readInput('./day1/input.txt')))

const readInput = require('../utils/readInput')
const test = require('../utils/test')
const getResult = require('../utils/getResult')

class Day3 {
    constructor() {
        this.x = { 'U': 0, 'D': 0, 'L': -1, 'R': 1 }
        this.y = { 'U': 1, 'D': -1, 'L': 0, 'R': 0 }
    }

    part1(input) {
        const wire1 = this.getPoints(input[0].split(','))
        const wire2 = this.getPoints(input[1].split(','))
        const both = this.findMatches(wire1, wire2)
        const points = both.map(point => {
            const [x, y] = point.split(',').map(Number)
            return Math.abs(x) + Math.abs(y)
        })
        return Math.min(...points)
    }

    part2(input) {
        const [wire1, wire1steps] = this.getPointsWithSteps(input[0].split(','))
        const [wire2, wire2steps] = this.getPointsWithSteps(input[1].split(','))
        const both = this.findMatches(wire1, wire2)

        let shortest
        for (let i = 0; i < both.length; i++) {
            if (shortest && wire1steps[both[i]] + wire2steps[both[i]] > shortest) {
                continue
            }
            shortest = wire1steps[both[i]] + wire2steps[both[i]]
        }
        return shortest
    }

    getPoints(wire) {
        let x = 0
        let y = 0
        let points = wire.reduce((set, cmd) => {
            const dir = cmd[0]
            const move = Number(cmd.slice(1))
            for (let i = 0; i < move; i++) {
                x += this.x[dir]
                y += this.y[dir]
                set.add(`${x},${y}`)
            }
            return set
        }, new Set())
        return points
    }

    getPointsWithSteps(wire) {
        let x = 0
        let y = 0
        let steps = 0
        const tracker = {}
        let points = wire.reduce((set, cmd) => {
            const dir = cmd[0]
            const move = Number(cmd.slice(1))
            for (let i = 0; i < move; i++) {
                x += this.x[dir]
                y += this.y[dir]
                steps += 1
                tracker[`${x},${y}`] = steps
                set.add(`${x},${y}`)
            }
            return set
        }, new Set())
        return [points, tracker]
    }

    findMatches(wire1, wire2) {
        const matches = []
        Array.from(wire1).forEach(point => {
            wire2.has(point) && matches.push(point)
        })
        return matches
    }
}

const day3 = new Day3()

test(day3.part1(['R8,U5,L5,D3', 'U7,R6,D4,L4']), 6)
test(day3.part1(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83']), 159)
test(day3.part1(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']), 135)
getResult(day3.part1(readInput('./day3/input.txt')))

test(day3.part2(['R8,U5,L5,D3', 'U7,R6,D4,L4']), 30)
test(day3.part2(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83']), 610)
test(day3.part2(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']), 410)
getResult(day3.part2(readInput('./day3/input.txt')))

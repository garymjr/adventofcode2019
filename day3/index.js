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
        return Math.min(...both)
    }

    getPoints(wire) {
        let x = 0
        let y = 0
        let points = wire.reduce((arr, cmd) => {
            const dir = cmd[0]
            const move = Number(cmd.slice(1))
            for (let i = 0; i < move; i++) {
                x += this.x[dir]
                y += this.y[dir]

                const dups = arr.filter(([ax, ay]) => {
                    return ax === x && ay === y
                })

                dups.length === 0 && arr.push([x, y])
            }
            return arr
        }, [])
        return points
    }

    findMatches(wire1, wire2) {
        const matches = []
        wire1.forEach(wire => {
            const [match] = wire2.filter(([x, y]) => {
                return wire[0] === x && wire[1] === y
            })
            match && matches.push(Math.abs(match[0]) + Math.abs(match[1]))
        })
        return matches
    }
}

const day3 = new Day3()

test(day3.part1(['R8,U5,L5,D3', 'U7,R6,D4,L4']), 6)
test(day3.part1(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83']), 159)
test(day3.part1(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']), 135)
getResult(day3.part1(readInput('./day3/input.txt')))

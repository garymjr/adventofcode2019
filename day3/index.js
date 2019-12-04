const readInput = require('../utils/readInput')
const test = require('../utils/test')
const getResult = require('../utils/getResult')

class Day3 {
    part1(input) {
        const wire1 = input[0].split(',').concat(input[1].split(','))
        const wire2 = input[1].split(',')

        let x = 0
        let y = 0
        let points = { 0: { 0: 1 } }
        for (let i = 0; i < wire1.length; i++) {
            const dir = wire1[i][0]
            const value = Number(wire1[i].slice(1))

            if (dir === 'R') {
                const goal = x + value
                while (x < goal) {
                    x += 1
                    if (points[x]) continue
                    
                    points = Object.assign({}, points, {
                        [x]: { [y] : {} }
                    })
                }
            }

            if (dir === 'L') {
                const goal = x - value
                while (x > goal) {
                    x -= 1
                    if (points[x]) continue
                    
                    points = Object.assign({}, points, {
                        [x]: { [y]: {} }
                    })
                }
            }

            if (dir === 'U') {
                const goal = y + value
                while (y < goal) {
                    y += 1
                    if (points[x][y]) {
                        points[x][y] += 1
                    }
                    
                    points[x] = Object.assign({}, points[x], {
                        [y]: 1
                    })
                }
            }

            if (dir === 'D') {
                const goal = y - value
                while (y > goal) {
                    y -= 1
                    if (points[x][y]) {
                        points[x][y] -= 1
                    }
                    
                    points[x] = Object.assign({}, points[x], {
                        [y]: -1
                    })
                }
            }
        }
        console.log(points)
        // const wire1steps = wire1.reduce((steps, step) => {
        //     const dir = step[0]
        //     const value = Number(step.slice(1))
            
        //     let [x, y] = steps.slice(-1)[0]
        //     if (dir === 'R') {
        //         const goal = x + value
        //         while (x < goal) {
        //             x += 1
        //             steps.push([x, y])
        //         }
        //     } else if (dir === 'L') {
        //         const goal = x - value
        //         while (x > goal) {
        //             x -= 1
        //             steps.push([x, y])
        //         }
        //     } else if (dir === 'U') {
        //         const goal = y + value
        //         while (y < goal) {
        //             y += 1
        //             steps.push([x, y])
        //         }
        //         y += value
        //     } else if (dir === 'D') {
        //         const goal = y - value
        //         while (y > goal) {
        //             y -= 1
        //             steps.push([x, y])
        //         }
        //     }

        //     return steps
        // }, [[0, 0]])

        // const wire2steps = wire2.reduce((steps, step) => {
        //     const dir = step[0]
        //     const value = Number(step.slice(1))
            
        //     let [x, y] = steps.slice(-1)[0]
        //     if (dir === 'R') {
        //         const goal = x + value
        //         while (x <= goal) {
        //             x += 1
        //             steps.push([x, y])
        //         }
        //     } else if (dir === 'L') {
        //         const goal = x - value
        //         while (x >= goal) {
        //             x -= 1
        //             steps.push([x, y])
        //         }
        //     } else if (dir === 'U') {
        //         const goal = y + value
        //         while (y <= goal) {
        //             y += 1
        //             steps.push([x, y])
        //         }
        //         y += value
        //     } else if (dir === 'D') {
        //         const goal = y - value
        //         while (y >= goal) {
        //             y -= 1
        //             steps.push([x, y])
        //         }
        //     }

        //     return steps
        // }, [[0, 0]])

        // let distance;
        // for (let i = 0; i < wire1steps.length; i++) {
        //     const [ix, iy] = wire1steps[i]
        //     // if (ix === 0 || iy === 0) continue

        //     for (let j = 0; j < wire2steps.length; j++) {
        //         const [jx, jy] = wire2steps[j]
        //         if (jx === 0 || jy === 0) continue

        //         if (ix === jx && iy === jy) {
        //             if (!distance || distance >= (Math.abs(jx) + Math.abs(jy))) {
        //                 distance = Math.abs(jx) + Math.abs(jy)
        //             }
        //         }
        //     }
        // }
        return 0
    }
}

const day3 = new Day3()

test(day3.part1(['R8,U5,L5,D3', 'U7,R6,D4,L4']), 6)
// test(day3.part1(['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83']), 159)
// test(day3.part1(['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7']), 135)
// getResult(day3.part1(readInput('./day3/input.txt')))
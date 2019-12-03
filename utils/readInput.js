const fs = require('fs')

module.exports = function readInput(file) {
  let content = fs.readFileSync(file, 'utf8').split('\n')
  if (content.slice(-1)[0] === '') {
    content = content.slice(0, content.length - 1)
  }
  return content
}

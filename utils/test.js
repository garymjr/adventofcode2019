module.exports = function test(result, expected) {
  if (result === expected) {
    console.log('PASSED')
  } else {
    console.log('FAILED: expected ' + expected + '; got ' + result)
  }
}

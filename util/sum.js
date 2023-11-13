function sum (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw Error(`${a} or ${b} not is not a number`)
  }

  return a + b
}

module.exports = sum

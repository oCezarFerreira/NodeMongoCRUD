const sum = require('../util/sum')

test('Soma dois números', () => {
  const result = sum(1, 2)
  expect(result).toEqual(3)
})

test('Throw error if one input value is not a number', () => {
  expect(() => sum('1', 2)).toThrow(Error)
  expect(() => sum(1, '2')).toThrow(Error)
  expect(() => sum('a', 'b')).toThrow(Error)
})

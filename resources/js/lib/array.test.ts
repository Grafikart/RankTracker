import { describe, it, expect } from 'vitest'
import { chunk } from './array'

// Tests for the `chunk` method using it.each

describe('array.chunk', () => {
  it.each([
    { array: [], size: 3, expected: [] },
    { array: [1, 2, 3, 4], size: 2, expected: [[1, 2], [3, 4]] },
    { array: [1, 2, 3, 4, 5], size: 2, expected: [[1, 2], [3, 4], [5]] },
    { array: [1, 2, 3], size: 1, expected: [[1], [2], [3]] },
    { array: [1, 2, 3], size: 5, expected: [[1, 2, 3]] },
    { array: [1, 2, 3, 4], size: 4, expected: [[1, 2, 3, 4]] },
  ])('chunks numbers correctly: array=%j size=%d -> %j', ({ array, size, expected }) => {
    expect(chunk(array, size)).toEqual(expected)
  })

  it.each([
    { array: ['a', 'b', 'c', 'd'], size: 3, expected: [['a', 'b', 'c'], ['d']] },
    { array: ['x'], size: 1, expected: [['x']] },
    { array: ['x'], size: 10, expected: [['x']] },
  ])('chunks strings correctly: array=%j size=%d -> %j', ({ array, size, expected }) => {
    expect(chunk(array, size)).toEqual(expected)
  })

  it('throws an error when size is 0', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(/greater than 0/i)
  })
})

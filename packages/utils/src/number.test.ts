import { describe, expect, it } from 'vitest'
import { getRandomInt } from './number.js'

describe('getRandomInt', () => {
  it('should return a random integer between min and max', () => {
    const min = 1
    const max = 10
    const result = getRandomInt(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  it('should return a random integer between 0 and 20', () => {
    const min = 0
    const max = 20
    const result = getRandomInt(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })
})

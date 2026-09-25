import { describe, expect, it } from 'vitest'
import { SalesService } from './sales.service.js'

describe('SalesService', () => {
  it('should be defined', () => {
    const redisService = { //Fake redis service for the sake of testing.
      get: async () => null,
      set: async () => {},
      del: async () => {},
    }

    const service = new SalesService(redisService as any) // 'as any' lets ts treat this as the expected type

    expect(service).toBeDefined() //the actual test
  })
})
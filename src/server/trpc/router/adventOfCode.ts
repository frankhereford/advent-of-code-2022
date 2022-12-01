import { router, publicProcedure } from '../trpc'
import { env } from '../../../env/server.mjs'
import { AocClient } from 'advent-of-code-client'

export const colorRouter = router({

  stars: publicProcedure
    .query(async ({ ctx }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const aoc = new AocClient({
        year: 2022, // the year of the challenge
        day: 1, // the day of the challenge
        token: env.AOC_SESSION_TOKEN // the session cookie from adventofcode.com
      })
      return true
    })
})

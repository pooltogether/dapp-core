import { addSeconds } from 'date-fns'
import { BLOCKS_PER_YEAR, SECONDS_PER_YEAR } from './constants'

export function futureBlockDate (currentBlockDate, numberOfBlocksIntoFuture) {
  const secondsPerBlock = SECONDS_PER_YEAR / BLOCKS_PER_YEAR
  return addSeconds(currentBlockDate, numberOfBlocksIntoFuture * secondsPerBlock)
}

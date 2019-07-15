import { getSystemInfo } from '../../../utils/getSystemInfo'

/**
 * Resolvers execute the behaviour when an Apollo query with the same name is run.
 */
export const systemInfo = async function () {
  return await getSystemInfo()
}
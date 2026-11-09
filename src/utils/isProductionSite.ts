import { ENVIRONMENT } from './constants'
/**
 * 检查网站是否处于生产环境
 * @returns boolean
 */
export const isProductionSite = () => {
  return ENVIRONMENT === 'production'
}
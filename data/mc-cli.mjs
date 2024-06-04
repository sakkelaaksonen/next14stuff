import MemcachedPlus from 'memcache-plus'

export const KEY = 'data'
export const TIME = 1000000000

const mc = new MemcachedPlus();

export default mc
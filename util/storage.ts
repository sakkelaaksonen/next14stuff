import { SomeForm } from '@/actions/handleAction'
import mc, {KEY} from '@/data/mc-cli.mjs'


export async function save(newEntry: SomeForm) {
  const data = await mc.get(KEY)
  return await mc.set(KEY, [...data,newEntry],(e:unknown)=>{
      throw new Error('Error while saving to memcached')
  })
}

export async function get() {
  return await mc.get(KEY)
}
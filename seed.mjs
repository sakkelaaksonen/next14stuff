import mc, {KEY,TIME} from './data/mc-cli.mjs'

export const defaultData = [
    {
        systemValue:'initial default entry',
        text: 'finding the holey gruel.',
        amount: '50',
        status:'on',
        id:1
    }
] 

async function PlantMemCache() {
    // Store a value
    await mc.set(KEY, defaultData,(e)=>{console.log('error',e)})
    console.log('DEFAULTS LOADED')
    return await mc.get(KEY)
}


PlantMemCache().then((data)=>{
    console.log(data)
    process.exit()
})

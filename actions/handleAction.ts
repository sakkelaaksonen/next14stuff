'use server'

import { redirect } from 'next/navigation'
import mc, {KEY} from '@/data/mc-cli.mjs'
import EntryValidator from '@/util/validate'

export  type CheckBoxValue = 'on' | null
export type GoAwayValue = '0'| '1'

export type SomeForm = {
    systemValue: string
    text?: string | null
    amount: number
    status: CheckBoxValue
    goaway?: GoAwayValue

}

export type MessageType = 'yes'|'no' | ''

export type ReturnValue = {
    message: MessageType
    amount: number,
    text?: string | null,
}

export default async function handleAction(systemValue:string, prevState: any, formData: FormData): Promise<ReturnValue> {

    const rawFormData: SomeForm = {
        systemValue,
        text: formData.get('text') as string,
        amount:  parseInt(formData.get('amount')  as string ?? '0',10) as number,
        status: formData.get('status') as CheckBoxValue,
        goaway: formData.get('goaway') as GoAwayValue
    }
    // Validation here, return errors if needed
    const valid = EntryValidator.safeParse(rawFormData)
    if(!valid.success) {
        throw new Error('Validation error')
    }
    console.log('Valid data. Saving to memory')
    //Just a delay so we can see what's going on.
    await new Promise(res => setTimeout(res, 2000))

    const data = await mc.get(KEY)
    mc.set(KEY, [...data,rawFormData],(e:unknown)=>{
        throw new Error('Error while saving to memcached')
    })
    //Redirect to goaway page instead of returning to form
    if(rawFormData.goaway === '1') {
        redirect('/goaway')
    }

    const {amount,text}    = rawFormData
    
    // revalidate cache
    // revalidatePath('/listofactions')

    return { message: rawFormData.status === 'on' ? 'yes': 'no', amount, text}
    
  
}

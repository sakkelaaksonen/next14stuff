'use server'

import { redirect } from 'next/navigation'
import mc, {KEY} from '@/data/mc-cli.mjs'
import EntryValidator from '@/util/validate'
import * as storage from '@/util/storage'
export  type CheckBoxValue = 'on' | null
export type GoAwayValue = '0'| '1'

export type SomeForm = {
    systemValue: string
    text?: string | null
    amount: number
    status: CheckBoxValue
    goaway?: GoAwayValue

}

export type MessageType = string

export type ReturnValue = {
    message: MessageType
    amount: number,
    text?: string | null,
}

export default async function handleAction(systemValue:string, prevState: any, formData: FormData) {

    const rawFormData: SomeForm = {
        systemValue,
        text: formData.get('text') as string,
        amount:  parseInt(formData.get('amount')  as string ?? '0',10) as number,
        status: formData.get('status') as CheckBoxValue,
        goaway: formData.get('goaway') as GoAwayValue
    }
    // Validation here, return errors if needed
    const fields = EntryValidator.safeParse(rawFormData)
    if(!fields.success) {
      return {  errors:fields.error.flatten().fieldErrors}
    }
    console.log('Valid data. Saving to memory')
    //Just a delay so we can see what's going on.
    await new Promise(res => setTimeout(res, 2000))

    // Will throw error if save fails
    await storage.save(rawFormData)
    
    //Redirect to goaway page instead of returning to form
    if(rawFormData.goaway === '1') {
        redirect('/goaway')
    }

    const {amount,text}    = rawFormData
    
    return { message: rawFormData.status === 'on' ? 'yes': 'no', amount, text}
    
  
}

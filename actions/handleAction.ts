'use server'


type CheckBoxValue = 'on' | null

type SomeForm = {
    systemValue: string
    text: string | null
    amount: string | null
    status: CheckBoxValue
    goaway?: CheckBoxValue

}

export type ReturnValue = {
    message: 'yes'|'no' | '',
    amount: number,
    text?: string,
}

export default async function handleAction(systemValue:string, prevState: any, formData: FormData) {

    const rawFormData: SomeForm = {
        systemValue,
        text: formData.get('text') as string,
        amount: formData.get('amount') as string,
        status: formData.get('status') as CheckBoxValue,
        goaway: formData.get('goaway') as CheckBoxValue
    }
    // Validation here, return errors if needed
    console.log(rawFormData)
    const amount = parseInt(rawFormData.amount || '0' ,10)
    const text = rawFormData.text
    //Do something with data, handle t if needed
    await new Promise(res => setTimeout(res, 3000))

    // handle return value for success or error
    // revalidate cache
    // revalidatePath('/listofactions')

    return { message: rawFormData.status === 'on' ? 'yes': 'no', amount:rawFormData.amount, text}
    
  
}

type CheckBoxValue = 'on' | null

type SomeForm = {
    systemValue: string
    userTextValue: string | null
    amount: string | null
    status: CheckBoxValue
}


export default async function handleAction(systemValue: string, formData: FormData) {
    'use server'

    const rawFormData: SomeForm = {
        systemValue,
        userTextValue: formData.get('userTextValue') as string,
        amount: formData.get('amount') as string,
        status: formData.get('status') as CheckBoxValue
    }
    console.log(rawFormData)
    await new Promise(res => setTimeout(res, 3000))

    //  return rawFormData
    // mutate data
    // revalidate cache
}

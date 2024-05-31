'use client'

import handleAction, { type ReturnValue } from "@/actions/handleAction"
import { SubmitButton } from "./Submit"
import { useFormState } from "react-dom"

type ActionProps = {
    systemValue: string
}

export default function ActionForm({ systemValue }: ActionProps) {
    // systemValue is now the first parameter when when this action is called
    const actionWithSystemValue = handleAction.bind(null, systemValue)

    const initialState = {
        message: '',
    }
    // This adds prevState to the action parameters
    const [state, formAction] = useFormState(actionWithSystemValue, initialState)

    return (

        <>
            <h1>Server Actions</h1>
            <div className="block">
                {/* This adds FormData to the action parameters */}
                <form action={formAction} className="formClasses">
                    <label htmlFor="text">What is your Quest?</label>
                    <input type="text" name="text" id="text-id" />
                    <label htmlFor="amount-id">What is your value?</label>
                    <input type="number" name="amount" id="amount-id" />
                    <label htmlFor="status-id">Are you ready?</label>
                    <input type="checkbox" name="status" id="status-id" />
                    <input type="hidden" name="goaway" />
                    <SubmitButton />

                </form >
            </div>
            <ReadyState {...state as ReturnValue} />

        </>
    )
}

const ReadyState = ({ message, amount, text }: ReturnValue) => {
    if (message === '') { return null }
    const hasMessage = message === 'yes';
    return (
        <div className="block text-center">
            <p>Are you ready? "{message}".   {message == 'no' && ' OK, I shall wait'}</p>
            {hasMessage && text !== '' && <p>What a novel Quest you have! I hope you succeed in {text}</p>}
            {hasMessage && <p>Twice you are this much: {amount * 2}</p>}
        </div>
    )

}
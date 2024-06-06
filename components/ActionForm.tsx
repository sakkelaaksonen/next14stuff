'use client'

import handleAction, { type ReturnValue } from "@/actions/handleAction"
import { SubmitButton } from "./Submit"
import { useFormState } from "react-dom"
import Link from "next/link";

import cls from 'classnames'

type ActionProps = {
    systemValue: string
}

export default function ActionForm({ systemValue }: ActionProps) {
    // systemValue is now the first parameter when when this action is called
    const actionWithSystemValue = handleAction.bind(null, systemValue)

    const initialState: ReturnValue = {
        message: '',
        amount: 0
    }
    
    // This adds prevState to the action parameters
    const [state, formAction] = useFormState(actionWithSystemValue, initialState)

 const formClasses = cls('formClasses',{
    'error-text':state.errors?.text,
    'error-amount': state.errors?.amount,
    'error-status': state.errors?.status,
 })

  return (

      <>
      <h1>Server Actions</h1>
      <div className="block">
        {/* This adds FormData to the action parameters */}
        <form action={formAction} className={formClasses}>
            <label htmlFor="text">What is your Quest?</label>
            <textarea name="text" id="text-id" ></textarea>
            <label htmlFor="amount-id">What is your value?</label>
            <input type="number" name="amount" id="amount-id" />
            <label htmlFor="status-id">Are you ready?</label>
            <input type="checkbox" name="status" id="status-id" />
            <input type="hidden" name="goaway" value="0" />
            <SubmitButton />
        </form >
      </div>
      {state.errors?.text && <p>Surely you have a purpose for being here.</p>}
      {state.errors?.amount && <p>Yuu must value yourself more than this in order to succeed.</p>}
      {state.errors?.status && <p>You are not ready. I shall wait.</p>}

      {!state.errors && <ReadyState {...state as ReturnValue} />}
    </>
  )
}

const ReadyState = ({ message, amount, text }: ReturnValue) => {
    
  if(message === '') {
    return null
  }

  const hasMessage = message === 'yes';
  
  return (
      <div className="block text-center">
          {/* <p>Are you ready? "{message}".   {message == 'no' && ' OK, I shall wait'}</p> */}
          {hasMessage && text !== '' && <p>What a novel Quest you have! I hope you succeed in {text}</p>}
          {hasMessage && <p>Twice you are this much: {amount * 2} </p>}
          <Link href="/" className="bg-dark-trans p-8 m-8 text-white">See all Quests</Link>
      </div>
  )

}
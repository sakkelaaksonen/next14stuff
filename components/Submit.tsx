'use client'

import { useFormStatus } from 'react-dom'

function goAway(event: any) { // >:(

    const input = event.currentTarget.form?.goaway
    input.value = '1'
    event.currentTarget.form?.requestSubmit();
}

export function SubmitButton() {
    const { pending } = useFormStatus()
    const text = pending ? '...' : 'Go'
    return (
        <div className="block">
            <button type="submit" className="submit" disabled={pending}>
                {text}
            </button>
            {pending && 'Scrying for thee fortunes'}
            <button className="submit" onClick={goAway}>Go away</button>
        </div>)

}
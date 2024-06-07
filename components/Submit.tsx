'use client'

import { useFormStatus } from 'react-dom'
import cls from 'classnames'
function goAway(event: any) { // >:(

    const input = event.currentTarget.form?.goaway
    input.value = '1'
    event.currentTarget.form?.requestSubmit();
}

export function SubmitButton() {
    const { pending } = useFormStatus()
    const text = pending ? '...' : 'Go'
    const loadingClasses = cls('max-w-52', { 'invisible': !pending })

    return (<>
        <div className="block">
            <button type="submit" className="submit" disabled={pending}>
                {text}
            </button>
            <button className="submit" onClick={goAway} disabled={pending}>Go away</button>
        </div>
        <div className="block ">
            <p className={loadingClasses}>Scrying for thee fortunes</p>
        </div>
        <div className="block">
        </div>
    </>)

}
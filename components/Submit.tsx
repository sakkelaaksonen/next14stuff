'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" className="submit" disabled={pending}>
            Go
        </button>
    )
}
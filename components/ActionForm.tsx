import handleAction from "@/actions/handleAction"
import { SubmitButton } from "./Submit"
type ActionProps = {
    systemValue: string
}

export default function ActionForm({ systemValue }: ActionProps) {

    const actionWithSystemValue = handleAction.bind(null, systemValue)
    return (

        <>
            <h1>Server Actions</h1>
            <form action={actionWithSystemValue} className="formClasses">
                <input type="text" name="userTextValue" id="userTextValue-id" />
                <input type="number" name="amount" id="amount-id" />
                <input type="checkbox" name="status" id="status-id" />

                <SubmitButton />
            </form >

        </>
    )
}
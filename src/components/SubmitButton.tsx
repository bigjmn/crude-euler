'use client'

import { useFormStatus } from "react-dom"
import { Button } from "./Button"
export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" disabled={pending}>
            {pending && <span>Submitting...</span>}
            {!pending && <span>Submit</span>}
        </Button>
    )

}
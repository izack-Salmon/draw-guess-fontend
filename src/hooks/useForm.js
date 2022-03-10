import { useEffect, useState } from "react"

export const useForm = (initialState) => {

    const [fields, setFields] = useState(initialState)

    const handleChange = ({ target }) => {
        const field = target.name
        setFields(target.value)
    }

    return [fields, handleChange, setFields]

}
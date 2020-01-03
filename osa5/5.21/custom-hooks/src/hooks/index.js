import { useState, useEffect } from "react"
import axios from "axios"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios
            .get(baseUrl)
            .then(res => {
                console.log(res.data)
                setResources(res.data)
            })
    }, [baseUrl])

    const create = async object => {
        const res = await axios.post(baseUrl, object)
        setResources(resources.concat(res.data))
        return res.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}
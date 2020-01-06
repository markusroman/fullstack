import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newAnec) => {
    const response = await axios.post(baseUrl, newAnec)
    return response.data
}

const update = async (anec) => {
    const response = await axios.put(`${baseUrl}/${anec.id}`, anec)
    return response.data
}

export default { getAll, create, update }
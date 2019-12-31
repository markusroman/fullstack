import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {
  headers: { Authorization: token },
}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl} /${id}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, getOne, create, update, setToken, remove }
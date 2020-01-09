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

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return res.data
}

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const comment = async (newObject) => {
  const res = await axios.put(`${baseUrl}/${newObject.id}/comments`, newObject, config)
  return res.data
}

export default { getAll, getOne, create, update, setToken, remove, comment }
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
  console.log("Haetaan...")
  const res = await axios.get(baseUrl)
  return res.data
}

const getOne = async (id) => {
  
  console.log("Haetaan yhtä...")
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (newObject) => {
  console.log("Luodaan uutta...")
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (id, newObject) => {
  console.log("Lisätään tykkäys...")
  const res = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return res.data
}

const remove = async (id) => {
  console.log("Poistetaan...")
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, getOne, create, update, setToken, remove }
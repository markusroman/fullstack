import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    console.log("Haetaan kaikki käyttäjät...")
    const res = await axios.get(baseUrl)
    return res.data
  } catch (error) {
    return null
  }
}

const getOne = async (id) => {
    console.log("Haetaan yksi käyttäjä...")
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}
  
const create = async (newObject) => {
    console.log("Luodaan uusi käyttäjä...")
    const res = await axios.post(baseUrl, newObject)
    return res.data
}
  
const update = async (newObject) => {
    console.log("Päivitetään käyttäjä...")
    const res = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return res.data
}
  
const remove = async (id) => {
    console.log("Poistetaan käyttäjä...")
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
}
  
  export default { getAll, getOne, create, update, remove }
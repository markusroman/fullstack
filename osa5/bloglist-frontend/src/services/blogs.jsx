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
    axios
    .get(baseUrl)
    .then(response => {
      console.log(response.data)
      return (
        response.data
        )})
    .catch(error =>{
      console.log(error)
      return null
    })
}

const getOne = (id) => {
  axios
  .get(`${baseUrl}/${id}`)
  .then(response => {
    return (
      response.data
      )})
  .catch(error =>{
    console.log(error)
    return null
  })
}

const create = (newObject) => {
  axios
  .post(baseUrl, newObject, config)
  .then(response => {
    return (
      response.data
      )})
  .catch(error =>{
    console.log(error)
    return null
  })
}

const update = (id, newObject) => {
    axios
    .put(`${baseUrl}/${id}`, newObject, config)
    .then(response => {
      return (
        response.data
        )})
    .catch(error =>{
      console.log(error)
      return null
    })
}

const remove = (id) => {
  axios
  .delete(`${baseUrl}/${id}`, config)
  .then(response => {
    return (
      response.data
      )})
  .catch(error =>{
    console.log(error)
    return null
  })
}

export default { getAll, getOne, create, update, setToken, remove }
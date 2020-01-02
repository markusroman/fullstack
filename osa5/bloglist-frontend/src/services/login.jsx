import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  try {
    console.log("Kirjaudutaan...")
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (error) {
    return null
  }
  
}

export default { login }
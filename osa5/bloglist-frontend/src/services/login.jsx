import axios from 'axios'
const baseUrl = '/api/login'

const login = (credentials) => {
    try {
        axios
        .post(baseUrl, credentials)
        .then(response => response.data)
    } catch (error) {
      console.log(error)
      return null
    }
    
}

export default { login }
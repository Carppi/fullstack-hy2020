import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

//update can be created here (esim. https://fullstackopen.com/osa5/kirjautuminen_frontendissa#muistiinpanojen-luominen). Add also to export in that case. 

export default { getAll, create, setToken }

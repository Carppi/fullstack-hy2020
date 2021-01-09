import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('getAll onnistuu')
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('create onnistuu')
    return request.then(response => response.data)   
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log('deletePerson onnistuu')
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    console.log('update onnistuu')
    return request.then(response => response.data)
}

const exports = {
    create,
    getAll,
    deletePerson,
    update
}

export default exports
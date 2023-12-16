import axios from 'axios'
const baseUrl = '/api/blogs'

const getAllComments = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then((response) => response.data)
}

const create = async (id, newObject) => {
  console.log(newObject)
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  console.log(newObject)
  return response.data
}

export default { getAllComments, create }

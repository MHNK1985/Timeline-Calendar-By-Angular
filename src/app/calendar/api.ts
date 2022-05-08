import axios from 'axios'

const noteApi = axios.create({
  baseURL: 'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/notes',
})

export default noteApi; 

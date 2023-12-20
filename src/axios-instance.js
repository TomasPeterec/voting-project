import axios from 'axios'

const axiosInstance = axios.create({
  // Basic URL
  baseURL: process.env.REACT_APP_API_ROOT_VAR
})

export default axiosInstance

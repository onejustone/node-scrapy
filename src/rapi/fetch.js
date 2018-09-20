import axios from 'axios'

const fetch = axios.create({
  timeout: 30000
})

fetch.interceptors.response.use(
  response => {
    const res = response
    if (res.status !== 200) {
      return Promise.reject(res.error)
    }
    return Promise.resolve(res.data)
  },
  error => {
    console.log('ma de cuo lw')
    return Promise.reject(error)
  })

export default fetch

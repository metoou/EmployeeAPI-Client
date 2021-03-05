import * as axios from '/node_modules/axios/dist/axios.min.js'

export const HTTP = axios.create({
    baseURL: `https://localhost:5001/api/v1/`
  })
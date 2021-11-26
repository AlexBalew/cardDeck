import axios from 'axios'

const BaseURLs ='http://localhost:7542/2.0/'
//const BaseURLs = 'https://neko-back.herokuapp.com/2.0/'

export const instance = axios.create({
    baseURL: BaseURLs,
    withCredentials: true,
})


import axios from 'axios'

// baseURL only lasts 8 hours witn NGROK, so change often or errors will occur.
export default axios.create({
    baseURL: 'https://66c605f8.ngrok.io/'
})
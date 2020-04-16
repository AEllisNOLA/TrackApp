import axios from 'axios'

// baseURL only lasts 8 hours witn NGROK, so change often or errors will occur.
export default axios.create({
    baseURL: 'https://785d8943.ngrok.io/'
})
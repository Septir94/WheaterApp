import axios from 'axios';

const instance = axios.create({
    baseURL:'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5'
})
instance.defaults.headers.common['Authorization']='Au'
export default instance;
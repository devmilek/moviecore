import axios from 'axios'

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '520bb2e219d710ef62e111c5306a5676',
        language: 'pl-PL',
    },
})

export default movieDB

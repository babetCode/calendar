import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        // Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
         accept: 'application/json'
    }
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        else {
            config.headers.Authorization = ``
        }
        return config
    }
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('Token')
            window.location.href = '/'
        }
    }
    // async function (error) {
    //     const originalRequest = error.config

    //     if (typeof error.response === 'undefined') {
    //         alert(
    //             'A server/network error occurred. ' +
    //             'Looks like CORS might be the problem. ' +
    //             'Sorry about this - we will get it fixed shortly.'
    //         )
    //         return Promise.reject(error)
    //     }

    //     if (error.response.status === 401 && originalRequest.url === baseUrl+'token/refresh/') {
    //         window.location.href = '/login/'
    //         return Promise.reject(error)
    //     }

    //     if (error.response.data.code === 'token_not_valid' &&
    //         error.response.status === 401 &&
    //         error.response.statusText === 'Unauthorized') {
    //         const refreshToken = localStorage.getItem('refresh_token')

    //         if (refreshToken) {
    //             const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

    //             // exp date in token is expressed in seconds, while now() returns milliseconds:
    //             const now = Math.ceil(Date.now() / 1000)
    //             console.log(tokenParts.exp)

    //             if (tokenParts.exp > now) {
    //                 return AxiosInstance
    //                     .post('token/refresh/', {refresh: refreshToken})
    //                     .then((response) => {

    //                         localStorage.setItem('Token', response.data.access)
    //                         localStorage.setItem('refresh_token', response.data.refresh)

    //                         AxiosInstance.defaults.headers['Authorization'] = 'Token ' + response.data.access
    //                         originalRequest.headers['Authorization'] = 'Token ' + response.data.access

    //                         return AxiosInstance(originalRequest)
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     })
    //             }
    //             else {
    //                 console.log('Refresh token is expired', tokenParts.exp, now)
    //                 window.location.href = '/login/'
    //             }
    //         }
    //         else {
    //             console.log('Refresh token not available.')
    //             window.location.href = '/login/'
    //         }
    //     }

    //     return Promise.reject(error)
    // }
)

export default AxiosInstance
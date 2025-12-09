import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

//Thêm token vào header trước khi gửi
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
}, (error) => {
    console.error('Error in axios interceptors: ', error)
    return Promise.reject(error)
})

//tự động gọi refresh token khi accesstoken hết hạn

export default api
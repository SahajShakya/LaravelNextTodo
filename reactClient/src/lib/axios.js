import Axios from "axios";

const axiosClient = Axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: 'http://localhost:8000',
    headers: {
        'X-Request-With': 'XMLHttpRequest'
    },
    withCredentials: true
});
export default axiosClient

import axios from 'axios';
import Cookies from 'js-cookie';

// docs: https://github.com/axios/axios#config-defaults
const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
    headers: {
        "Authorization": `Bearer ${Cookies.get('token')}`,
        "Content-Type":'application/json'
    }
});

export default instance;
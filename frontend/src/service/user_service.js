import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:9000/pages/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'home');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}

export default new UserService();
import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:9000/pages/';

class UserService {

    getLearningMaterials() {
        return axios.get(API_URL + 'materials', { headers: authHeader() });
    }
}

export default new UserService();
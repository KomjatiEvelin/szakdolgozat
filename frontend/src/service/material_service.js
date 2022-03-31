import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:9000/pages/';

class MaterialService {

    getLearningMaterials() {
        return axios.get(API_URL + 'materials', { headers: authHeader() }).then((response)=>response.data);;
    }
}

export default new MaterialService();

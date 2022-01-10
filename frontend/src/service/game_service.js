import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:9000/pages/';

class GameService {

    getGames(classnum) {
        return axios.get(API_URL + `games?classnum=${classnum}`, { headers: authHeader() }).then((response)=>response.data);
    }

}

export default new GameService();
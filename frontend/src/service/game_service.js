import axios from 'axios';
import authHeader from './auth_header';

const API_URL = 'http://localhost:9000/pages/';

class GameService {

    getGames(classnum) {
        return axios.get(API_URL + `games?classnum=${classnum}`, { headers: authHeader() }).then((response)=>response.data);
    }

    saveScore(userid,gameid,score){
        return axios.post(API_URL+'games/savescore', {
            userid,
            gameid,
            score
        }).then((response)=>response.data);
    }

}

export default new GameService();

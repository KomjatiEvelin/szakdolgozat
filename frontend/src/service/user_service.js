import axios from "axios";
import authHeader from './auth_header';

const API_URL = "http://localhost:9000/users/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, classnum,email, password) {
        return axios.post(API_URL + "register", {
            username,
            email,
            classnum,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    modifyUserData(email,classnum,username){
        return axios.put(API_URL+"update",{
            email,
            classnum,
            username
        },{ headers: authHeader() }).then(response => {
            if (response.status===200) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });

    }

    getResults(userid){

        return axios.get(API_URL+`results?userid=${userid}`,{ headers: authHeader() }).then((response)=>response.data);
    }
}

export default new AuthService();
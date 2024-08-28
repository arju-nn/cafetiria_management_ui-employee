import axios from 'axios'

class AuthService {
    static signup(data) {
        return axios.post('http://localhost:5000/api/users/create', data);
    }

    static login(data) {
        return axios.post('http://localhost:5000/api/auth/login', data);
    }

 static authHeader() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {

        return { Authorization: 'Bearer ' + user.token }

    }



}
}

export default AuthService;
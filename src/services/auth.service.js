import axios from 'axios'

// const API_URL = 'http://192.168.8.112:3000/api/auth/'
// const API_URL = 'http://127.0.0.1:3000/api/auth/'
// const API_URL = 'https://94.154.76.136:3000/api/auth/'
const API_URL = 'https://m1.nmtport.ru:3000/api/auth/'

class AuthService {
  login(user) {
    return axios.post(API_URL + 'signin', {
      username: user.username,
      password: user.password,
    })
      .then(response => {
        console.log(response)
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data;
      })
  }
  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      password: user.password,
      invite: user.invite,
      roles: ['manager']
    })
  }
}

export default new AuthService();

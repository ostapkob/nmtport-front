import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://192.168.8.112:3000/api/test/'
// const API_URL = 'http://127.0.0.1:3000/api/test/'
// const API_URL = 'http://94.154.76.136:3000/api/test/'
const API_URL = 'https://m1.nmtport.ru:3000/api/auth/test/'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all')
  }
  getUserBoard() {
    return axios.get(API_URL + 'user', {headers: authHeader()})
  }
  getManagerBoard() {
    console.log('authHeader: ',  authHeader());
    return axios.get(API_URL + 'manager', {headers: authHeader()})
  }
  getAdminBoard() {
    return axios.get(API_URL + 'admin', {headers: authHeader()})
  }
}
export default new UserService();



import axios from 'axios';

const Response = axios.create({
  baseURL: 'https://parcial-topicos.herokuapp.com/api/clientes',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default Response;
import axios from "axios"; 

const instance = axios.create({
  baseURL : 'https://busticketbackend-production.up.railway.app/api/',
  headers: {
  }, 
  // .. other options
});

export default instance;
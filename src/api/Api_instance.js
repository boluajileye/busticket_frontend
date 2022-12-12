import axios from "axios"; 

const instance = axios.create({
  baseURL : 'https://busticket.boluajileye.com/api/',
  headers: {
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
  }, 
  // .. other options
});

export default instance;
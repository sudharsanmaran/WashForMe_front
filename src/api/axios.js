import axios from "axios";
import Cookies from "universal-cookie";

const BASE_URL = "http://192.168.5.111:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
const cookies = new Cookies;
const accessToken = cookies.get("access_token");

console.log(accessToken, 'from axios')
  
api.interceptors.request.use((config) => {
config.headers.Authorization = `Bearer ${accessToken}`;
return config;
});



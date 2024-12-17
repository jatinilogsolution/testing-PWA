import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.146.119/SwimSSP/api",
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  // config.headers.Accept = "application/json";
  // config.headers.ContentType = "application/json";
  return config;
});

export default axiosClient;

// import axios from ‘axios’
// export default axios.create({
//  baseURL: `your API end point`,
//  headers: {
//  ‘Accept’: ‘application/json’,
//  ‘Content-Type’: ‘application/json’
//  }
//  })

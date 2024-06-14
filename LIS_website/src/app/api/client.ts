import axios from "axios";

const domain = "https://10.0.31.145:45456";
// const domain = "https://localhost:7242";
// const domain = "https://toretto.azurewebsites.net";

const apiRequestTimeOut = 6000;

const api = axios.create({
  baseURL: domain + "/api/",
  timeout: apiRequestTimeOut,
  headers: {
    Accept: "application/json",
  },
});

export default api;

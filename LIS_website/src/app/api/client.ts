import axios from "axios";

const domain = "https://lisbackend20240618115905.azurewebsites.net";
// const domain = "https://localhost:7242";
// const domain = "https://toretto.azurewebsites.net";

const apiRequestTimeOut = 10000;

const api = axios.create({
  baseURL: domain + "/api/",
  timeout: apiRequestTimeOut,
  headers: {
    Accept: "application/json",
  },
});

export default api;

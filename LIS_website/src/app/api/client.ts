import axios from "axios";

const domain = "http://localhost:44313";
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

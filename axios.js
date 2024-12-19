import axios from "axios";

try {
  process.loadEnvFile();
} catch (err) {}
const { AUTHORIZATION } = process.env;

const _api_prod = axios.create({
  baseURL: "https://api.somosedison.com",
  headers: {
    Authorization: AUTHORIZATION,
  },
});

const api_qa = axios.create({
  baseURL: "https://qa.api.somosedison.com/",
  headers: {
    Authorization: AUTHORIZATION,
  },
});

const _api_local = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    Authorization: AUTHORIZATION,
  },
});

export default api_qa;

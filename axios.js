import { result } from "@volpe/utils";
import axios from "axios";
const tryLoadEnv = () => {
  process.loadEnvFile();
  return process.env;
};
const tryLoadParameter = () => {
  return process.env;
};

let [err, data] = tryLoadEnv[result]();
if (err || !data) {
  [err, data] = tryLoadParameter[result]();
  if (err) throw err;
  if (!data) throw err;
}

const { AUTHORIZATION, TAL } = data;
for (let _ in Array.from({ length: 10 })) {
  console.log(TAL);
}

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

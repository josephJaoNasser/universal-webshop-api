const axios = require("axios");
const baseURL = `https://app.ecwid.com/api/v3/${process.env.STORE_ID}`;

const get = (route, id) => {
  return axios.get(`${baseURL}/${route}` + id ? "/" + id : "");
};

const post = (route) => {
  return axios.post(`${baseURL}/${route}`);
};

const patch = (route, id) => {
  return axios.patch(`${baseURL}/${route}/${id}`);
};

const remove = (route, id) => {
  return axios.delete(`${baseURL}/${route}/${id}`);
};

module.exports = {
  get,
  post,
  patch,
  delete: remove,
};

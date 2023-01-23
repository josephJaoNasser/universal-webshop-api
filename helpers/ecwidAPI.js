const axios = require("axios");
const baseURL = `https://app.ecwid.com/api/v3/${process.env.STORE_ID}`;
const config = {
  headers: {
    Authorization: "Bearer " + process.env.ACCESS_TOKEN,
  },
};

const get = (route, id) => {
  return axios.get(`${baseURL}${route}` + (id ? "/" + id : ""), config);
};

const post = (route) => {
  return axios.post(`${baseURL}/${route}`, config);
};

const patch = (route, id) => {
  return axios.patch(`${baseURL}/${route}/${id}`, config);
};

const remove = (route, id) => {
  return axios.delete(`${baseURL}/${route}/${id}`, config);
};

module.exports = {
  get,
  post,
  patch,
  delete: remove,
};

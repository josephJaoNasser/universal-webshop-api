import axios from 'axios'

type AuthConfig = {
  headers: {
    Authorization: string
  }
}

class EcwidApiHelper {
  baseURL: string;
  storeID: string;
  token: string;
  config: AuthConfig;

  constructor(storeID: string, token: string) {
    this.storeID = storeID;
    this.token = token;
    this.baseURL = "https://app.ecwid.com/api/v3/" + storeID;
    this.config = {
      headers: {
        Authorization: token,
      },
    };
  }

  get(route, id?) {
    return axios.get(
      `${this.baseURL}${route}` + (id ? "/" + id : ""),
      this.config
    );
  }

  post(route) {
    return axios.post(`${this.baseURL}/${route}`, this.config);
  }

  patch(route, id) {
    return axios.patch(`${this.baseURL}/${route}/${id}`, this.config);
  }

  remove(route, id) {
    return axios.delete(`${this.baseURL}/${route}/${id}`, this.config);
  }
}

export default EcwidApiHelper
type AuthConfig = {
  headers: {
    Authorization: string;
  };
};

class EcwidApi {
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
}

export interface EcwidCredential {
  token?: string;
}

export default EcwidApi;

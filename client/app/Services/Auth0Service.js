import store from "../store";

class Auth0Service {
  setAuthenticated() {
    store.commit("userAuthenticated", true);
  }

  setUnAuthenticated() {
    store.commit("userAuthenticated", false);
  }
}

let auth0Service = new Auth0Service();
export default auth0Service;
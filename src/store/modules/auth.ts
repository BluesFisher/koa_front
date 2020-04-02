// tslint:disable:no-shadowed-variable
import { IAuthState } from "../index.d";

// initial state
const state: IAuthState = {
  csrfToken: ""
};

// getters
const getters = {};

// actions
const actions = {
  setCsrfToken({ commit, state }: any, newState: IAuthState) {
    console.log("vuex/auth/setToken", newState);
    commit("setCsrfToken", newState.csrfToken || "");
  }
};

// mutations
const mutations = {
  setCsrfToken: (state: IAuthState, csrfToken: string) => {
    state.csrfToken = csrfToken;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

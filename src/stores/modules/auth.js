import { pathOr, isEmpty } from 'ramda';

import router from '@/router';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from '../mutation-types';
import JwtService from '../../common/jwt.service';
import ApiService from '../../utils/api.service';
import { Routes } from '../../constants/enum';

const state = {
  errors: null,
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  errorsState(state) {
    return isEmpty(state.errors) ? '' : state.errors;
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, token) {
    state.isAuthenticated = true;
    state.errors = {};
    JwtService.saveToken(token);
    ApiService.setHeader();
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
};

const actions = {
  authRequest({ commit, dispatch }, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('auth/login', credentials)
        .then(async response => {
          const token = pathOr('', ['data', 'token'], response);

          commit(SET_AUTH, token);
          await dispatch('getModules');

          resolve();
        })
        .catch(error => {
          const { response } = error;
          const message = pathOr('', ['data', 'message'], response);
          commit(SET_ERROR, message);
          reject();
        });
    });
  },
  async registrationRequest({ commit }, { firstName, lastName, email, password }) {
    try {
      const body = {
        name: `${firstName} ${lastName}`,
        email,
        password,
      };

      commit(SET_ERROR, null);

      const response = await ApiService.post('auth/signup', body);
      const token = pathOr('', ['data', 'token'], response);
      commit(SET_AUTH, token);

      router.push({ name: Routes.InitialPayment });
    } catch (error) {
      const { response } = error;
      const message = pathOr('', ['data', 'message'], response);
      commit(SET_ERROR, message);
    }
  },
  restorePasswordRequest({ commit }, email) {
    return new Promise((resolve, reject) => {
      ApiService.post('auth/restore', { email })
        .then(resolve)
        .catch(error => {
          reject(error);
          const { response } = error;
          const message = pathOr('', ['data', 'message'], response);
          commit(SET_ERROR, message);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import router from '@/router';
import { API_URL } from '../common/config';
import JwtService from '../common/jwt.service';
import pathOr from 'ramda/es/pathOr';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = '') {
    return new Promise((resolve, reject) => {
      Vue.axios
        .get(`${resource}/${slug}`)
        .then(resolve)
        .catch(error => {
          const code = pathOr('', ['response', 'status'], error);

          if (code === 401) {
            JwtService.destroyToken();
            router.push('/auth');
            reject(error);
            return;
          } else if (code === 402) {
            router.push('/payment');
            reject(error);
            return;
          }

          if (code) {
            router.replace(`/${code}`);
          }

          reject(error);
        });
    });
  },

  post(resource, body) {
    return Vue.axios.post(resource, body);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, body) {
    return Vue.axios.put(resource, body);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },
};

export default ApiService;

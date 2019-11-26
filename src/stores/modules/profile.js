import { propOr, pathOr } from 'ramda';

import { SET_PROFILE, SET_PROFILE_UPDATE_ERROR } from '../mutation-types';
import ApiService from '../../utils/api.service';
import { capitalizeFirstLetter } from '../../utils/helpers';

const state = {
  updateError: null,
  user: {},
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  userInfo(state) {
    return propOr(null, 'info', state.user);
  },
  updateError(state) {
    return capitalizeFirstLetter(state.updateError);
  },
  isPaid(state) {
    const user = state.user;
    return propOr(false, 'paid', user);
  },
};

const mutations = {
  [SET_PROFILE](state, user) {
    const [firstName, lastName] = user.name.split(' ');

    state.user = {
      ...user,
      firstName: firstName || '',
      lastName: lastName || '',
    };
  },
  [SET_PROFILE_UPDATE_ERROR](state, error) {
    state.updateError = error;
  },
};

const actions = {
  getProfile({ commit }) {
    return new Promise(async resolve => {
      ApiService.setHeader();
      const { data } = await ApiService.get('profile');
      const user = propOr({}, 'data', data);
      commit(SET_PROFILE, user);
      resolve(user);
    });
  },
  postProfileInfo(_, body) {
    return new Promise(async resolve => {
      await ApiService.post('profile/info', body);
      resolve();
    });
  },
  updateProfile({ commit }, payload) {
    const { firstName, lastName, email } = payload;
    const body = {
      name: `${firstName} ${lastName}`,
      email,
    };
    if (payload.newPassword) {
      body.password = payload.newPassword;
    }

    return new Promise((resolve, reject) => {
      ApiService.put('profile', body)
        .then(resolve)
        .catch(err => {
          const message = pathOr('Profile update error', ['response', 'data', 'message'], err);
          commit(SET_PROFILE_UPDATE_ERROR, message);
          reject();
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

import { SELECT_CHAPTER } from '../mutation-types';

const state = {
  selectedChapterId: null,
};

const getters = {
  selectedChapterId(state) {
    return state.selectedChapterId;
  },
};

const mutations = {
  [SELECT_CHAPTER](state, chapterId) {
    state.selectedChapterId = chapterId;
  },
};

export default {
  state,
  getters,
  mutations,
};

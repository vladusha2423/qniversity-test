import { last, compose, propOr, pathOr, omit, head } from 'ramda';
import router from '@/router';

import {
  GET_NEXT_FRAGMENT,
  SET_CHAPTER,
  INIT_FRAGMENTS,
  SET_MODULES,
  SET_TASKS,
  UPDATE_FRAGMENT_FORM,
  UPDATE_FRAGMENT,
  SET_FEEDBACK,
  SHOW_RATING_FRAGMENT,
  RESET_FORM_STATE,
} from '../../../mutation-types';
import ApiService from '../../../../utils/api.service';
import { parseFragments } from '../utils/chaptersUtils';
import { TASK_TYPES } from '../constants/chaptersConstants';

const state = {
  nextChapterId: null,
  moduleList: [],
  chapterList: [],
  selectedModule: {},
  chapter: {},
  tasks: {},
  fragmentEntities: {},
  fragmentList: {},
  availableFragments: [],
  fragmentFormState: {},
  showRatingFragment: false,
  feedback: {
    interestingRate: 0,
    usefulRate: 0,
    comment: '',
  },
};

const getters = {
  moduleList(state) {
    return state.moduleList;
  },
  chapterList(state) {
    return state.chapterList;
  },
  selectedModule(state) {
    return state.selectedModule;
  },
  chapters(state) {
    return propOr([], 'chapters', state.selectedModule);
  },
  chapter(state) {
    return state.chapter;
  },
  tasks(state) {
    return state.tasks;
  },
  availableFragments(state) {
    return propOr([], 'availableFragments', state);
  },
  fragmentFormState(state) {
    return state.fragmentFormState;
  },
  fragmentsLength(state) {
    return Object.keys(state.fragmentEntities).length;
  },
  fragmentList(state) {
    return state.fragmentList;
  },
  firstFragmentId(state) {
    const { fragmentList } = state;
    return compose(
      propOr('', 'fragmentId'),
      head,
    )(fragmentList);
  },
  feedback(state) {
    return state.feedback;
  },
  nextChapterId(state) {
    return state.nextChapterId;
  },
  showRatingFragment(state) {
    return state.showRatingFragment;
  },
  certificateId(state) {
    return propOr('', 'certificateId', state.selectedModule);
  },
  versionId(state) {
    return propOr('', 'versionId', state.selectedModule);
  },
  currentChapterId(state) {
    const nextChapterId = propOr('', 'nextChapterId', state.selectedModule);

    if (!nextChapterId) {
      return propOr('', 'chapterId', head(propOr('', 'chapters', state.selectedModule)));
    }
    return nextChapterId;
  },
  chapterId(state) {
    const chapterId = pathOr('', ['chapter', 'chapterId'], state);
    const chapters = state.selectedModule.chapters;

    if (chapters && chapterId) {
      const selectedChapter = chapters.find(item => item.chapterId === chapterId);
      return propOr(1, 'id', selectedChapter);
    }

    return 1;
  },
};

const mutations = {
  [SET_MODULES](state, { moduleList, chapterList }) {
    state.chapterList = chapterList.reduce(
      (acc, chapter) => ({
        ...acc,
        [chapter.chapterId]: chapter,
      }),
      {},
    );

    state.moduleList = moduleList.map(module => ({
      ...module,
      chapters: module.chapters.map((chapterId, id) => ({
        id: id + 1,
        ...state.chapterList[chapterId],
      })),
    }));

    state.selectedModule = state.moduleList[state.moduleList.length - 1];
  },
  [SET_CHAPTER](state, data) {
    state.chapter = data.chapter || {};
  },
  [INIT_FRAGMENTS](state, { data, versionId }) {
    let index = 1;
    let { nextFragmentId, feedback, chapterId } = state.chapter;

    const selectedModule = state.moduleList.find(mod => mod.versionId === versionId);
    const nextChapters = selectedModule.chapters.filter(item => chapterId < item.chapterId);

    const fragmentList = (data.fragmentList || []).map(fragment => ({
      ...fragment,
      taskId: fragment.taskType ? index++ : null,
    }));

    state.nextChapterId = nextChapters.length > 0 ? propOr(null, 'chapterId', head(nextChapters)) : null;

    if (feedback) {
      state.feedback = feedback;
      Object.keys(feedback).forEach(key => {
        state.feedback[key] = feedback[key];
      });
    }

    state.fragmentEntities = parseFragments(fragmentList);
    state.fragmentList = fragmentList;

    if (!nextFragmentId) {
      state.availableFragments = fragmentList;

      state.availableFragments.forEach(fragment => {
        const { fragmentId } = fragment;
        const name = propOr('', 'taskType', fragment);
        const defaultValue = name !== 'multiple' ? '' : [];
        const value = pathOr(defaultValue, ['taskResponse', name], fragment);
        const comment = pathOr('', ['taskResponse', 'comment'], fragment);

        if (TASK_TYPES[name]) {
          state.fragmentFormState = {
            ...state.fragmentFormState,
            [fragmentId]: {
              [name]: value,
              comment,
            },
          };
        }
      });
      return;
    }

    const nextFragment = state.fragmentEntities[nextFragmentId];

    if (nextFragment.type === 'subtitle') {
      for (let i = 0; i < state.fragmentList.length; i++) {
        const currentFragment = state.fragmentList[i];

        if (currentFragment.fragmentId === nextFragmentId) {
          nextFragmentId = propOr(Number(nextFragmentId) + 1, 'fragmentId', state.fragmentList[i + 1]);
          break;
        }
      }
    }

    state.availableFragments = fragmentList.filter(fragment => fragment.fragmentId <= nextFragmentId);

    state.availableFragments.forEach(fragment => {
      const { fragmentId } = fragment;
      const name = propOr('', 'taskType', fragment);
      const defaultValue = name !== 'multiple' ? '' : [];
      const value = pathOr(defaultValue, ['taskResponse', name], fragment);
      const comment = pathOr('', ['taskResponse', 'comment'], fragment);

      if (TASK_TYPES[name]) {
        state.fragmentFormState = {
          ...state.fragmentFormState,
          [fragmentId]: {
            [name]: value,
            comment,
          },
        };
      }
    });
  },
  [SET_TASKS](state, data) {
    const taskOptionList = data.taskOptionList.map(task => ({
      id: task.taskOptionId,
      content: task.content,
    }));
    state.tasks = taskOptionList.reduce(
      (acc, task) => ({
        ...acc,
        [task.id]: task,
      }),
      {},
    );
  },
  [GET_NEXT_FRAGMENT](state) {
    const lastSelectedFragmentId = compose(
      propOr('', 'fragmentId'),
      last,
    )(state.availableFragments);

    for (let i = 0; i < state.fragmentList.length; i++) {
      let currentFragment = state.fragmentList[i];

      if (currentFragment.fragmentId === lastSelectedFragmentId) {
        i = i + 1;
        currentFragment = state.fragmentList[i];
        state.availableFragments.push(currentFragment);

        if (currentFragment.type === 'subtitle') {
          i = i + 1;
          currentFragment = state.fragmentList[i];
          state.availableFragments.push(currentFragment);
        }
        break;
      }
    }
  },
  [UPDATE_FRAGMENT_FORM](state, { fragmentId, name, value }) {
    state.fragmentFormState = {
      ...state.fragmentFormState,
      [fragmentId]: {
        ...state.fragmentFormState[fragmentId],
        [name]: value,
      },
    };
  },
  [UPDATE_FRAGMENT](state, { fragment }) {
    state.availableFragments = state.availableFragments.map(availableFragment => {
      if (availableFragment.fragmentId === fragment.fragmentId) {
        return {
          ...availableFragment,
          ...fragment,
        };
      }
      return availableFragment;
    });
  },
  [SET_FEEDBACK](state, { name, value }) {
    state.feedback[name] = value;
  },
  [SHOW_RATING_FRAGMENT](state, showRatingFragment) {
    state.showRatingFragment = showRatingFragment;
  },
  [RESET_FORM_STATE](state) {
    state.fragmentEntities = {};
    state.availableFragments = [];
    state.fragmentFormState = {};
    state.showRatingFragment = false;
    state.feedback = {
      interestingRate: 0,
      usefulRate: 0,
      comment: '',
    };
  },
};

const actions = {
  getChapterById({ commit }, { versionId, chapterId }) {
    return new Promise(resolve => {
      const slug = `${versionId}/chapters/${chapterId}`;
      ApiService.get('modules', slug).then(({ data }) => {
        commit(SET_CHAPTER, data.data);
        commit(SET_TASKS, data.data);
        commit(INIT_FRAGMENTS, { data: data.data, versionId });
        commit(SHOW_RATING_FRAGMENT, false);
        resolve();
      });
    });
  },
  getModules({ commit }) {
    return new Promise(resolve => {
      ApiService.get('modules').then(({ data }) => {
        commit(SET_MODULES, data.data);
        const moduleList = pathOr([], ['data', 'moduleList'], data);

        const selectedModule = moduleList[moduleList.length - 1];
        const certificateId = propOr('', 'certificateId', selectedModule);
        resolve(certificateId);
      });
    });
  },
  async sendAnswer({ state, commit }, { chapterId, fragmentId, versionId }) {
    const body = state.fragmentFormState[fragmentId];
    const slug = `${versionId}/chapters/${chapterId}/fragments/${fragmentId}/commit`;
    const { data } = await ApiService.post(`modules/${slug}`, body);
    commit(UPDATE_FRAGMENT, data.data);
  },
  async submitFragment({ commit, state }, { chapterId, fragmentId, versionId }) {
    const slug = `${versionId}/chapters/${chapterId}`;
    if (state.availableFragments.length >= 2) {
      const prevFragment = state.availableFragments[state.availableFragments.length - 2];
      if (prevFragment.type === 'subtitle') {
        await ApiService.post(`modules/${slug}/fragments/${prevFragment.fragmentId}/commit`, {});
      }
    }
    await ApiService.post(`modules/${slug}/fragments/${fragmentId}/commit`, {});

    const lastFragmentId = compose(
      last,
      pathOr('', ['chapter', 'fragments']),
    )(state);

    if (fragmentId === lastFragmentId) {
      commit(SHOW_RATING_FRAGMENT, true);
      return;
    }
    commit(GET_NEXT_FRAGMENT);
  },
  async sendRating({ state }, { versionId, chapterId }) {
    const body = !state.feedback.comment ? omit(['comment'], state.feedback) : state.feedback;
    const slug = `${versionId}/chapters/${chapterId}/finish`;

    if (!body.comment && !body.interestingRate && !body.usefulRate) {
      body.interestingRate = 0;
      body.usefulRate = 0;
    }

    await ApiService.post(`modules/${slug}`, body);
  },
  async redirectToCertificate({ dispatch, state }, routeParams) {
    try {
      const isCompleted = propOr(false, 'isCompleted', state.chapter);

      if (!isCompleted) {
        await dispatch('sendRating', routeParams);
      }

      const certificateId = await dispatch('getModules');
      router.push(`/certificate/${certificateId}`);
    } catch {
      const certificateId = await dispatch('getModules');
      router.push(`/certificate/${certificateId}`);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

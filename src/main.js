import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import VueScrollTo from 'vue-scrollto';
import VBodyScrollLock from 'v-body-scroll-lock';

import VueWait from 'vue-wait';
import SocialSharing from 'vue-social-sharing';
import Meta from 'vue-meta';

import App from './App.vue';
import router from './router';
import store from './stores';

import ApiService from './utils/api.service';
import JwtService from './common/jwt.service';
import { PURGE_AUTH } from './stores/mutation-types';
import { formDictionary, Routes } from './constants/enum';
import { propOr, isEmpty } from 'ramda';

Vue.config.productionTip = false;
ApiService.init();
Vue.use(VueScrollTo);
Vue.use(VBodyScrollLock);
Vue.use(VeeValidate);
Vue.use(VueWait);
Vue.use(SocialSharing);
Vue.use(Meta);

Validator.localize('en', formDictionary);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.mustAuth)) {
    if (!JwtService.getToken()) {
      store.commit(PURGE_AUTH);
      router.replace({ name: Routes.Auth });
      return next();
    }

    return Promise.all([store.dispatch('getProfile')]).then(([user]) => {
      const info = propOr(null, 'info', user);

      if (!user.paid && to.name !== Routes.InitialPayment) {
        router.replace('/payment');
        return next();
      }

      if (!isEmpty(user) && user.paid && !info && to.name !== Routes.AdditionalInfo) {
        router.replace({ name: Routes.AdditionalInfo });
        return next();
      }

      return next();
    });
  }

  next();
});

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: false,
    vuexModuleName: 'wait',
    registerComponent: true,
    componentName: 'v-wait',
    registerDirective: true,
    directiveName: 'wait',
  }),
  render: h => h(App),
}).$mount('#app');

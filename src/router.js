import Vue from 'vue';
import Router from 'vue-router';
import { Routes } from './constants/enum';

import InitialPayment from './views/InitialPayment';
import AdditionalInfo from './views/AdditionalInfo';
import Chapter from './views/Chapter';
import Profile from './views/Profile';
import NotFound from './views/NotFound';
import Authorization from './views/Authorization';
import Main from './views/Main';
import Registration from './views/Registration';
import RestorePassword from './views/RestorePassword';
import CertificateDetails from './views/CertificateDetails/CertificateDetails';
import Home from './views/Home';
import { scrollBehavior } from './utils/helpers';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: Routes.Home,
      component: Home,
    },
    {
      path: '/auth',
      name: Routes.Auth,
      component: Authorization,
    },
    {
      path: '/registration',
      name: Routes.Registration,
      component: Registration,
    },
    {
      path: '/certificate/:id',
      name: Routes.CertificateDetails,
      component: CertificateDetails,
    },
    {
      path: '/restore',
      name: 'Restore',
      component: RestorePassword,
    },
    {
      path: '/additional-info',
      name: 'AdditionalInfo',
      component: AdditionalInfo,
      meta: {
        mustAuth: true,
      },
    },
    {
      path: '/profile',
      name: Routes.Main,
      component: Main,
      meta: {
        mustAuth: true,
      },
      children: [
        {
          path: '/profile',
          name: Routes.Profile,
          component: Profile,
        },
        {
          path: '/payment',
          name: Routes.InitialPayment,
          component: InitialPayment,
        },
        {
          path: '/chapter/:versionId/:chapterId',
          name: 'Chapter',
          component: Chapter,
          meta: {
            showProgress: true,
          },
        },
      ],
    },
    {
      path: '*/:code',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

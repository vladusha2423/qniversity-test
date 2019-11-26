import { Routes } from '../constants/enum';

export const capitalizeFirstLetter = string => (!string ? string : string.charAt(0).toUpperCase() + string.slice(1));

export const scrollBehavior = (to, from, savedPosition) => {
  if (to.name === Routes.Profile || to.name === Routes.CertificateDetails) {
    return { x: 0, y: 0 };
  }

  return savedPosition ? savedPosition : {};
};

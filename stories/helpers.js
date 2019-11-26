export const SpacerDecorator = (story) => {
  const options = story();
  return {
    ...options,
    template: `<div style="margin: 2rem;">${options.template}</div>`,
  };
};

export const Backgrounds = {
  WHITE: { name: 'white', value: '#ffffff', default: false },
  BLACK: { name: 'black', value: '#000000', default: false },
  SILVER: { name: 'silver', value: '#e0e0e0', default: false },
  LIGHT_SILVER: { name: 'light-silver', value: '#f7f7f7', default: false },
};

export const isDefaultBg = (color) => ({ ...color, default: true });

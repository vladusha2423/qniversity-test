export const parseFragments = fragmentList => {
  let index = 1;
  return fragmentList.reduce(
    (acc, fragment) => ({
      ...acc,
      [fragment.fragmentId]: {
        ...fragment,
        taskId: fragment.taskType ? index++ : null,
      },
    }),
    {},
  );
};

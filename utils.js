export const preventAction = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

export const disableAllActions = (event, disable) => {
  if (disable) window.addEventListener(event, preventAction, true);
  else window.removeEventListener(event, preventAction, true);
};

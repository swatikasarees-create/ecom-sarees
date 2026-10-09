export type SnackbarEventDetail = {
  message: string;
  type?: 'warning' | 'error' | 'info' | 'success';
};

const SNACKBAR_EVENT = 'swatika-snackbar-message';

export const showSnackbar = (
  message: string,
  type: 'warning' | 'error' | 'info' | 'success' = 'warning'
) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<SnackbarEventDetail>(SNACKBAR_EVENT, {
      detail: { message, type },
    })
  );
};

export const getSnackbarEventName = () => SNACKBAR_EVENT;

import i18n from '../locales/init';

const handleParsingError = (watchedState, i18nKey) => {
  const updatedErrors = { submit: i18n.t(i18nKey) };
  const newState = { ...watchedState, errors: updatedErrors };
  Object.assign(watchedState, newState);
};

export default handleParsingError;

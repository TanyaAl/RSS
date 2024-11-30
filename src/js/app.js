import * as yup from 'yup';
import _ from 'lodash';
import onChange from 'on-change';
import i18n from '../locales/init.js';
import renderErrors from '../renders/renderErrors.js';
import getData from '../utils/axios.js';

const app = () => {
  const state = {
    rssForm: {
      stateForm: 'invalid',
      feeds: [],
      currentFeed: '',
    },
    errors: {},
  };

  const elements = {
    form: document.getElementById('rss-form'),
    field: document.getElementById('url-input'),
    submit: document.getElementById('rss-submit'),
    feedback: document.querySelector('.feedback'),
    get posts() {
      return document.querySelectorAll('.post');
    },
    feeds: document.querySelector('.feeds'),
  };

  const watchedState = onChange(
    state,
    (path, value) => renderErrors(watchedState, path, value, elements),
  );

  yup.setLocale({
    string: {
      url: () => i18n.t('validation.correctURL'),
    },
    mixed: {
      required: () => i18n.t('validation.requiredField'),
      notOneOf: () => i18n.t('validation.doubleUrl'),
    },
  });

  const getSchema = () => yup.object().shape({
    submit: yup
      .string()
      .required()
      .url()
      .notOneOf(watchedState.rssForm.feeds.map((feed) => feed.url)),
  });

  const validate = (field) => {
    const schema = getSchema();
    return schema.validate(field, { abortEarly: false })
      .then(() => ({}))
      .catch((err) => {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        return errors;
      });
  };

  elements.field.addEventListener('input', (e) => {
    e.preventDefault();
    watchedState.rssForm.currentFeed = { submit: e.target.value.trim().toLowerCase() };
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.submit.disabled = true;

    validate(watchedState.rssForm.currentFeed).then((errors) => {
      watchedState.errors = errors;
      watchedState.rssForm.stateForm = _.isEmpty(watchedState.errors) ? 'valid' : 'invalid';
      if (watchedState.rssForm.stateForm !== 'valid') {
        elements.submit.disabled = false;
      }
    });
    getData(watchedState, elements);
  });
};

export default app;

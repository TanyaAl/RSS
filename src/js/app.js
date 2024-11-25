import * as yup from 'yup';
import _ from 'lodash';
import i18next from 'i18next';
import onChange from 'on-change';
// import axios from 'axios';
import en from '../locales/en.json';
import initView from './view';
// import { getAllOriginsUrl, parseRSS } from '../utils/parser';
// import renderFeeds from '../renders/renderFeeds';
// import renderPosts from '../renders/renderPosts';
import getData from '../utils/axios';

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
    // posts: document.getElementsByClassName('.post'),
    get posts() {
      return document.querySelectorAll('.post');
    },
    feeds: document.querySelector('.feeds'),
  };
  
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'en',
    debug: true,
    resources: {
      en,
    },
  });

  yup.setLocale({
    string: {
      url: () => i18n.t('validation.correctURL'),
    },
    mixed: {
      required: () => i18n.t('validation.requiredField'),
      notOneOf: () => i18n.t('validation.doubleUrl'),
    },
  });

  const schema = yup.object().shape({
    input: yup
      .string()
      .required()
      .url()
      .notOneOf(state.rssForm.feeds),
  });

  const validate = (field) => schema.validate(field, { abortEarly: false })
    .then(() => ({}))
    .catch((err) => {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      return errors;
    });

  const watchedState = onChange(
    state,
    (path, value) => initView(watchedState, path, value, elements),
  );

  elements.field.addEventListener('input', (e) => {
    e.preventDefault();
    watchedState.rssForm.currentFeed = { input: e.target.value };
    validate(watchedState.rssForm.currentFeed).then((errors) => {
      watchedState.errors = errors;
      watchedState.rssForm.stateForm = _.isEmpty(watchedState.errors) ? 'valid' : 'invalid';
    });
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.submit.disabled = true;
    validate(watchedState.rssForm.currentFeed).then((errors) => {
      watchedState.errors = errors;
      if (watchedState.rssForm.stateForm !== 'valid') {
        elements.submit.disabled = false;
        return;
      }
      getData(watchedState, elements);
    });
  });

};

export default app;

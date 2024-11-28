import * as yup from 'yup';
import _ from 'lodash';
import i18n from '../locales/init';
import onChange from 'on-change';
import initView from './view';
import getData from '../utils/axios';
// import validate from '../utils/yup';

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

  yup.setLocale({
    string: {
      url: () => i18n.t('validation.correctURL'),
    },
    mixed: {
      required: () => i18n.t('validation.requiredField'),
      notOneOf: () => 'validation.doubleUrl',
    },
  });

  const watchedState = onChange(
    state,
    (path, value) => initView(watchedState, path, value, elements),
  );

  const validate = (field) => schema.validate(field, { abortEarly: false })
  .then(() => ({}))
  .catch((err) => {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      return errors;
    });

  const schema = yup.object().shape({
    input: yup
      .string()
      .required()
      .url()
      .notOneOf(watchedState.rssForm.feeds.map(feed => feed.url)),
  });



  elements.field.addEventListener('input', (e) => {
    e.preventDefault();
    watchedState.rssForm.currentFeed = { input: e.target.value.trim().toLowerCase() };
    validate(watchedState.rssForm.currentFeed).then((errors) => {
      // console.log(watchedState.rssForm.currentFeed);
      watchedState.errors = errors;
      // console.log('errors', watchedState.errors);
      watchedState.rssForm.stateForm = _.isEmpty(watchedState.errors) ? 'valid' : 'invalid';
    });
  });
  
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    elements.submit.disabled = true;
    validate(watchedState.rssForm.currentFeed).then((errors) => {
      // console.log('1', typeof watchedState.rssForm.currentFeed.input);
      // console.log('2', watchedState.rssForm.feeds.map(feed => typeof feed.url))
      watchedState.errors = errors;
      if (watchedState.rssForm.stateForm !== 'valid') {
        elements.submit.disabled = false;
        return;
      }
      getData(watchedState, elements);
    });
    // console.log('feeds for onOf yup', watchedState.rssForm.feeds.map(feed => watchedState.rssForm.currentFeed.input === feed.url));
  });
};

export default app;

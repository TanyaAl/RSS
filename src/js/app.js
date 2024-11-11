import * as yup from 'yup';
import _ from 'lodash';
import i18next from 'i18next';
import onChange from 'on-change';
import axios from 'axios';
import en from '../locales/en.json';
import initView from './view';
import { getAllOriginsUrl, parseRSS } from '../utils/parser';
import renderFeeds from '../renders/renderFeeds';
import renderPosts from '../renders/renderPosts';

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
    posts: document.querySelector('.posts'),
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
    console.log('Submit start');
    elements.submit.disabled = true;
    validate(watchedState.rssForm.currentFeed).then((errors) => {
      watchedState.errors = errors;
      // console.log('errors', watchedState.errors)
      if (watchedState.rssForm.stateForm !== 'valid') {
        // console.log('IM HERE');
        elements.submit.disabled = false;
        return;
      }
      const feedUrl = watchedState.rssForm.currentFeed.input;
      const proxyUrl = getAllOriginsUrl(feedUrl);
      
      axios.get(proxyUrl)
      .then((response) => {
        const { contents } = response.data;
        const parsedFeed = parseRSS(contents);

          watchedState.rssForm.feeds.push({ url: feedUrl, ...parsedFeed });
          // console.log('currentfeed', watchedState.rssForm.currentFeed);
          // console.log('HEEEEEEEEEY');
          // console.log(watchedState.rssForm.feeds);
          renderFeeds(watchedState.rssForm.feeds, elements);
          // renderPosts(watchedState.rssForm.feeds, elements);
          
          elements.form.reset();
          elements.field.focus();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          elements.submit.disabled = false;
        });
      });
  });
};

export default app;

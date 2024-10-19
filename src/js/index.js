import '../scss/styles.scss'
import'bootstrap';
// import * as yup from 'yup';
// import _ from 'lodash';
// import onChange from 'on-change';
// import initView from './view.js';

// const app = () => {
//     const existingFeeds = state.stateForm.feeds;
//     const schema = yup.object().shape({
//       input: yup
//         .string()
//         .required('this is a required field')
//         .url('this must be a valid url')
//         .test(
//             'is-duplicate',
//             'This RSS feed has already been added',   
//             (value) => !existingFeeds.includes(value)
//         ), 
//     });
  
//     const validate = (field) => {
//       const errors = {};
//       try {
//         schema.validateSync(field, { abortEarly: false });
//       } catch (e) {
//         e.inner.forEach((error) => {
//           errors[error.path] = error.message;
//         });
//       }
//       return errors;
//     };

//     const state = {
//         rssForm: {
//           stateForm: 'invalid',
//           feeds: [],
//           currentFeed: '',
//         },
//         errors: {},
//       };
    
//       const elements = {
//         form: document.getElementById('rss-form'),
//         field: document.getElementById('url-input'),
//         submit: document.getElementById('rss-submit'),
//       };
    
//       const watchedState = onChange(state, (path, value) => initView(watchedState, path, value));
    
//       elements.field.addEventListener('input', (e) => {
//         e.preventDefault();
//         watchedState.rssForm.currentFeed = { input: e.target.value };
//         const errors = validate(watchedState.rssForm.currentFeed);
//         watchedState.errors = errors;
//         if (_.isEmpty(watchedState.errors)) {
//           watchedState.rssForm.stateForm = 'valid';
//         } else {
//           watchedState.rssForm.stateForm = 'invalid';
//         }
//       });
    
//       elements.form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         elements.submit.disabled = true;
//         const errors = validate(watchedState.rssForm.currentFeed);
//         watchedState.errors = errors;
//         if (state.rssForm.stateForm === 'valid') {
//             watchedState.rssForm.feeds.push(watchedState.rssForm.currentFeed);
//             elements.form.reset();
//             elements.form.focus();
//         }
//       });
//     };
// export default app;
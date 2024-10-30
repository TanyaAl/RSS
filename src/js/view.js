import $ from 'jquery';

const initView = (watchedState, path, value, elements) => {
  // console.log('path', path);
  // console.log('errors', watchedState.errors);
  switch (path) {
    case 'rssForm.currentFeed':
      if (Object.keys(watchedState.errors).length !== 0) {
        $('.form-control').addClass('is-invalid');
        elements.feedback.textContent = watchedState.errors.input;
      } else {
        $('.form-control').removeClass('is-invalid');
        elements.feedback.textContent = '';
      }
      break;
    case 'rssForm.stateForm':
      if (value === 'valid') {
        $('.form-control').removeClass('is-invalid');
        elements.feedback.textContent = '';
      }
      break;
    default:
      break;
  }
};

export default initView;

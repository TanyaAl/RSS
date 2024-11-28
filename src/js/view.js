import $ from 'jquery';

const initView = (watchedState, path, value, elements) => {
  switch (path) {
    case 'rssForm.currentFeed':
      if (Object.keys(watchedState.errors).length !== 0) {
        console.log('view', watchedState.errors);
        $('.form-control').addClass('is-invalid');
        elements.feedback.classList.replace('text-success', 'text-danger');
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

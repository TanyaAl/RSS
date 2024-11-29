import $ from 'jquery';

const initView = (watchedState, path, value, elements) => {
  switch (path) {
    case 'errors':
      if (Object.keys(watchedState.errors).length !== 0) {
        $('.form-control').addClass('is-invalid');
        elements.feedback.classList.replace('text-success', 'text-danger');
        console.log('view', value.input);
        elements.feedback.textContent = value.input;
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

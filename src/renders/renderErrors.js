import $ from 'jquery';

const renderErrors = (watchedState, path, value, elements) => {
  const { feedback } = elements;
  switch (path) {
    case 'errors':
      if (Object.keys(watchedState.errors).length !== 0) {
        $('.form-control').addClass('is-invalid');
        feedback.classList.replace('text-success', 'text-danger');
        feedback.textContent = value.submit;
      } else {
        $('.form-control').removeClass('is-invalid');
        feedback.textContent = '';
      }
      break;
    case 'rssForm.stateForm':
      if (value === 'valid') {
        $('.form-control').removeClass('is-invalid');
        feedback.textContent = '';
      }
      break;
    default:
      break;
  }
};
export default renderErrors;

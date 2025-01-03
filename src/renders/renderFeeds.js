import i18n from '../locales/init.js';

const renderFeeds = (data, elements) => {
  // console.log('dataFeeds', data)
  const ul = document.querySelector('.ul-feeds');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0');
  const h4 = document.createElement('h4');
  h4.textContent = data.title;
  const description = document.createTextNode(data.description);
  li.append(h4);
  li.append(description);
  ul.prepend(li);
  const titles = document.querySelectorAll('.title');
  titles.forEach((title) => title.classList.replace('text-white', 'text-black'));
  const { feedback } = elements;
  feedback.classList.replace('text-danger', 'text-success');
  feedback.textContent = i18n.t('validation.success');
};

export default renderFeeds;

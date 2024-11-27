import renderModal from './renderModal';
import i18n from '../locales/init';

const renderPosts = (data, elements) => {
  const ul = document.querySelector('.ul-posts');
  const oldPosts = Array.from(elements.posts);
  data.forEach((obj) => {
    // console.log(obj);
    obj.items.forEach((post) => {
      // console.log('post', post);
      const exists = oldPosts.some((object) => object.title === post.title);
      if (!exists) {
        // console.log(!exists);
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0', 'post', 'd-flex', 'justify-content-between', 'align-items-start', 'border-end-0');
        li.setAttribute('title', post.title);
        const link = document.createElement('a');
        link.textContent = post.title;
        link.classList.add('text-wrap', 'flex-grow-1', 'fw-bold');
        link.setAttribute('href', '#');
        li.append(link);
        li.setAttribute('id', post.id);
        const button = document.createElement('button');
        button.classList.add('btn', 'view-button', 'btn-outline-primary', 'm-1', 'border-primary', 'position-relative', 'bottom-0', 'end-0');
        button.textContent = 'View';
        button.addEventListener('click', (e) => {
          renderModal(post, e);
          // console.log('renderModal done');
        });
        li.append(button);
        ul.prepend(li);
        // console.log(obj.items);
      }
    });
  });
  elements.feedback.classList.replace('text-danger', 'text-success')
  elements.feedback.textContent = i18n.t('validation.success');
};
export default renderPosts;

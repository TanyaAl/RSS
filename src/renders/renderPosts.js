import renderModal from './renderModal.js';

const renderPosts = (data, elements) => {
  // console.log('dataPosts', data)
  const ul = document.querySelector('.ul-posts');
  const oldPosts = Array.from(elements.posts);
  data.forEach((obj) => {
    obj.items.forEach((post) => {
      const exists = oldPosts.some((object) => object.title === post.title);
      if (!exists) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0', 'post', 'd-flex', 'justify-content-between', 'align-items-start', 'border-end-0');
        li.setAttribute('title', post.title);
        const link = document.createElement('a');
        link.textContent = post.title;
        link.classList.add('fw-bold');
        const postLink = new URL(post.link);
        link.href = postLink.toString();
        li.append(link);
        link.addEventListener('click', (e) => e.preventDefault());

        const button = document.createElement('button');
        button.classList.add('btn', 'view-button', 'btn-outline-primary', 'm-1', 'border-primary', 'position-relative', 'bottom-0', 'end-0');
        button.textContent = 'Просмотр';
        button.addEventListener('click', (e) => {
          renderModal(post, e);
        });
        li.append(button);
        ul.prepend(li);
      }
    });
  });
  elements.form.reset();
  elements.field.focus();
};
export default renderPosts;

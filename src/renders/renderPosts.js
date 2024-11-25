const renderPosts = (data, elements) => {
  const ul = document.querySelector('.ul-posts');
  const oldPosts = Array.from(elements.posts);
  data.forEach((obj) => {
    console.log(oldPosts);
    obj.items.forEach((post) => {
      // console.log('post', post);
      const exists = oldPosts.some((object) => object.title === post.title);
      if (!exists) {
        console.log(!exists);
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0', 'post');
        li.setAttribute('title', post.title);
        const link = document.createElement('a');
        link.textContent = post.title;
        link.setAttribute('href', '#');
        li.append(link);
        ul.prepend(li);
        const divForButton = document.createElement('div');
        divForButton.innerHTML = `<button type="button" class="btn btn-outline-primary border-primary position-absolute bottom-0 end-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
  View
</button>`;
        li.prepend(divForButton);
        console.log(obj.items);
      }
    });
  });
};
export default renderPosts;

const renderPosts = (data, elements) => {
  const oldPosts = elements.posts;
  const ul = document.querySelector('.ul-posts');
  data.forEach(obj => {
    console.log(obj.items)
    obj.items.forEach((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0');
      li.setAttribute('title', post.title);
      const link = document.createElement('a');
      link.textContent = post.title;
      link.setAttribute('href', '#');
      li.append(link);
      ul.prepend(li);
    
    });
    
  });
  console.log(data);
};

export default renderPosts;

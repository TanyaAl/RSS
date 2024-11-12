const renderPosts = (data, elements) => {
    const posts = elements.posts;
    console.log(posts)
    const items = data[data.length - 1].items;
    items.map((post) => {
        const ul = document.querySelector('.ul-posts');
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'border-0');
        const link = document.createElement('a');
        link.textContent = post.title;
        link.setAttribute('href', '#');
        li.append(link);
        ul.prepend(li);
        // posts.prepend(ul);
        // console.log(posts)
    })
};

export default renderPosts;
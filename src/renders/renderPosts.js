const renderPosts = (data, elements) => {
    const posts = elements.posts;
    const items = data[0].items;
    items.map((post) => {
        const p = document.createElement('p');
        const link = document.createElement('a');
        link.textContent = post.title;
        link.setAttribute('href', '#');
        p.append(link);
        posts.append(p);
        console.log(posts)
    })
};

export default renderPosts;
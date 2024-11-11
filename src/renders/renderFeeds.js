const renderFeeds = (data, elements) => {
    const feeds = elements.feeds;
    console.log(feeds)
    const p = document.createElement('p');
    const h2 = document.createElement('h2');
    h2.textContent = data[0].title;
    const description = document.createTextNode(data[0].description);
    p.append(h2);
    p.append(description);
    feeds.append(p);
    const titles = document.querySelectorAll('.title');
    titles.forEach((title) => title.classList.replace('text-white', 'text-black'));
};

export default renderFeeds;
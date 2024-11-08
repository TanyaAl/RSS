const renderFeeds = (data, elements) => {
    console.log('data', data);
    const feeds = elements.feeds;
    const feedList = document.createElement('ul');
    const feedLi = document.createElement('li');
    feedLi.textContent = data[0].title;
    feedList.append(feedLi);
    feeds.append(feedList);

};

export default renderFeeds;
import axios from 'axios';
import _ from 'lodash';
import { getAllOriginsUrl, parseRSS } from './parser';
import renderFeeds from '../renders/renderFeeds';
import renderPosts from '../renders/renderPosts';

const getData = (watchedState, elements) => {
  const feedUrl = watchedState.rssForm.currentFeed.input;
  const proxyUrl = getAllOriginsUrl(feedUrl);

  axios.get(proxyUrl)
    .then((response) => {
      const { contents } = response.data;
      const parsedFeed = parseRSS(contents);
      // console.log('before', watchedState.rssForm.feeds)
      const actualFeeds = watchedState.rssForm.feeds;
      // console.log('actual', actualFeeds);
      const newFeed = { url: feedUrl, ...parsedFeed };
      // console.log('new', newFeed.url);
      const exists = actualFeeds.some((obj) => obj.url === newFeed.url);
      // console.log('exists', exists);

      const items = actualFeeds.some((obj) => _.isEqual(obj.items, newFeed.items));
      // console.log(items)

      if (!exists) {
        watchedState.rssForm.feeds.push({ url: feedUrl, ...parsedFeed });
        renderPosts(watchedState.rssForm.feeds, elements);
        renderFeeds(watchedState.rssForm.feeds, elements);
      }
      if (exists && !items) {
        const newItems = watchedState.rssForm.feeds.find((obj) => obj.url === newFeed.url);
        console.log('newItems', newItems);
        newItems.items = [...newItems.items, ...newFeed.items
          .filter(((newItem) => !newItems.items.some(
            (oldItem) => oldItem.link === newItem.link,
          )))];

        renderPosts(watchedState.rssForm.feeds, elements);
      }

      console.log('after', watchedState.rssForm.feeds);

      elements.form.reset();
      elements.field.focus();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      elements.submit.disabled = false;
    });
  // setTimeout(() => getData(watchedState, elements), 5000);
};

export default getData;
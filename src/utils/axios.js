import axios from 'axios';
import _ from 'lodash';
import i18n from '../locales/init';
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
      const actualFeeds = watchedState.rssForm.feeds;
      const newFeed = { url: feedUrl, ...parsedFeed };
      const exists = actualFeeds.some((obj) => obj.url === newFeed.url);
      const items = actualFeeds.some((obj) => obj.items.title === newFeed.items.title);
      if (exists && items) {
        watchedState.errors = i18n.t('validation.doubleUrl'); 
       
        // console.log(exists && items);
      }
      if (!exists) {
        watchedState.rssForm.feeds.push({ url: feedUrl, ...parsedFeed });
        renderPosts(watchedState.rssForm.feeds, elements);
        renderFeeds(watchedState.rssForm.feeds, elements);
      }
      if (exists && !items) {
        const newItems = watchedState.rssForm.feeds.find((obj) => obj.url === newFeed.url);
        newItems.items = [...newItems.items, ...newFeed.items
          .filter(((newItem) => !newItems.items.some(
            (oldItem) => oldItem.link === newItem.link,
          )))];
        renderPosts(watchedState.rssForm.feeds, elements);
      }
      elements.form.reset();
      elements.field.focus();
    })
    .catch(() => {
      watchedState.errors = i18n.t('validation.network');
    })
    .finally(() => {
      elements.submit.disabled = false;
    });
    // console.log('timeout done');
    // setTimeout(() => getData(watchedState, elements), 5000);
  };

export default getData;

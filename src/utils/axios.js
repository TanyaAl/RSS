import axios from 'axios';
import { getAllOriginsUrl, parseRSS } from './parser.js';
import handleParsingError from './addTextForNotValidateErrors.js';

const getData = (watchedState, elements) => {
  const feedUrl = watchedState.rssForm.currentFeed.submit;
  const proxyUrl = getAllOriginsUrl(feedUrl);

  axios.get(proxyUrl)
    .then((response) => {
      const { contents } = response.data;
      let parsedFeed;
      try {
        parsedFeed = parseRSS(contents);
        console.log('parsed', parsedFeed);
      } catch {
        handleParsingError(watchedState, 'validation.inValidRSS');
        return;
      }
      const actualFeeds = watchedState.rssForm.feeds;
      const newFeed = { url: feedUrl, ...parsedFeed };
      const exists = actualFeeds.some((obj) => obj.url === newFeed.url);
      const items = actualFeeds.some((obj) => obj.items.title === newFeed.items.title);
      if (!exists) {
        watchedState.rssForm.feeds.push({ url: feedUrl, ...parsedFeed });
        watchedState.rssForm.addedLink = { url: feedUrl, ...parsedFeed };
        console.log('addedLinkNew', watchedState.rssForm.addedLink);
      }
      if (exists && !items) {
        const newItems = watchedState.rssForm.feeds.find((obj) => obj.url === newFeed.url);
        newItems.items = [...newItems.items, ...newFeed.items
          .filter(((newItem) => !newItems.items.some(
            (oldItem) => oldItem.link === newItem.link,
          )))];
      }
    })
    .catch(() => {
      console.log('catch!!!');
      handleParsingError(watchedState, 'network');
    })
    .finally(() => {
      const { submit } = elements;
      submit.disabled = false;
    });
};

export default getData;

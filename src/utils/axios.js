import axios from 'axios';
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

      watchedState.rssForm.feeds.push({ url: feedUrl, ...parsedFeed });
      renderFeeds(watchedState.rssForm.feeds, elements);
      renderPosts(watchedState.rssForm.feeds, elements);

      elements.form.reset();
      elements.field.focus();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      elements.submit.disabled = false;
    });
  setTimeout(() => getData(watchedState, elements), 5000);
};

export default getData;

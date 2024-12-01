import axios from 'axios';
import { getAllOriginsUrl, parseRSS } from './parser.js';
import renderPosts from '../renders/renderPosts.js';
import handleParsingError from './addTextForNotValidateErrors.js';

const updateData = (watchedState, elements) => {
  const { feeds } = watchedState.rssForm;
  const requests = feeds.map((feed) => {
    const feedUrl = feed.url;
    const proxyUrl = getAllOriginsUrl(feedUrl);

    return axios.get(proxyUrl)
      .then((response) => {
        const { contents } = response.data;
        let parsedFeed;
        try {
          parsedFeed = parseRSS(contents);
        } catch {
          handleParsingError(watchedState, 'validation.inValidRSS');
          return;
        }
        const newFeed = { url: feedUrl, ...parsedFeed };
        const existingPosts = feeds.some((oldFeed) => oldFeed.items.url === newFeed.items.url);
        if (!existingPosts) {
          const newPosts = newFeed.items.filter(
            (post) => post.items.some((item) => item.link === post.link),
          );
          const updatedPosts = feeds.map((f) => (
            f.url === feed.url
              ? { ...f, items: [...f.items, ...newPosts] }
              : f
          ));
          const updatedState = { ...watchedState, items: updatedPosts };
          Object.assign(watchedState, updatedState);

          renderPosts(watchedState.rssForm.feeds, elements);
        }
      })
      .catch(() => {
        handleParsingError(watchedState, 'network');
      });
  });
  Promise.all(requests).finally(() => {
    setTimeout(() => updateData(watchedState, elements), 5000);
  });
};
export default updateData;

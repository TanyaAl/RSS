const getAllOriginsUrl = (url) => {
  const allOriginsEndpoint = 'https://allorigins.hexlet.app/get';
  return `${allOriginsEndpoint}?disableCache=true&url=${encodeURIComponent(url)}`;
};

const parseRSS = (data) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'application/xml');
  const parseError = xml.querySelector('parsererror');
  if (parseError) {
    throw new Error('invalid data');
  }

  const channel = xml.querySelector('channel');
  const items = channel.querySelectorAll('item');

  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
    items: [...items].map((item) => ({
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' '),
      link: item.querySelector('link').textContent,
    })),
  };
  console.log(feed)
  return feed;
};
export { getAllOriginsUrl, parseRSS };

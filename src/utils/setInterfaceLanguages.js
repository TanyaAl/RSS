import i18n from '../locales/init';

const setInterfaceLanguages = (elements) => {
  const { texts } = elements;
  texts.rss_aggregator.textContent = i18n.t('interface_texts.rss-aggregator');
  texts.start_reading.textContent = i18n.t('interface_texts.start-reading');
  texts.rss_link.textContent = i18n.t('interface_texts.rss-link');
  texts.add_link.textContent = i18n.t('interface_texts.add-link');
  texts.link_example.textContent = i18n.t('interface_texts.link-example');
  texts.title_posts.textContent = i18n.t('interface_texts.title-posts');
  texts.title_feeds.textContent = i18n.t('interface_texts.title-feeds');
};
export default setInterfaceLanguages;

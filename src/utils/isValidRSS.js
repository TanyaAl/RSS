function isRSSFeed(url) {
    return fetch(url)
      .then((response) => {
 
        return response.text().then((text) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, 'application/xml');
  
          // Проверяем наличие обязательных тегов RSS
          return !!xmlDoc.querySelector('rss') || !!xmlDoc.querySelector('feed');
        });
      })
      .catch(() => false); // Возвращаем false при ошибке
  }
export default isRSSFeed;  
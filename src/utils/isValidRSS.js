import axios from "axios";

const isValidRSS = (value) => {
    return axios 
    .get(value)
    .then((response) => {
        const contentType = response.headers['content-type'];
        if (contentType.includes('xml')) {
            return false;
        }
        const parser = new DOMParser(contentType);
        const doc = parser.parseFromString(response.data, 'text/xml');
        const rss = doc.querySelector('rss');
        return !!rss;
    })
    .catch(() => false);
};

export default isValidRSS;
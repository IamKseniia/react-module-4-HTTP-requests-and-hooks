import axios from 'axios';

// axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';
axios.defaults.baseURL = 'https://hn.algolia.com/api/v1/search?query=react';

export const fetchArticlesWithTopic = async topic => {
  const response = await axios.get(`/search?query=${topic}`);
  return response.data.hits;
};

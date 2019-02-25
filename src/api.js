import axios from 'axios';
require('dotenv').config();
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: 'en-US'
  }
});

export const movie = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    }),
  search: (term) =>
    api.get('search/movie', {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

export const tv = {
  topRated: () => api.get('tv/top_rated'),
  popular: () => api.get('tv/popular'),
  airingToday: () => api.get('tv/airing_today'),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos'
      }
    }),
  search: (term) =>
    api.get('search/tv', {
      params: {
        query: encodeURIComponent(term)
      }
    })
};

export const collection = {
  getDetail: (id) => api.get(`collection/${id}`)
};
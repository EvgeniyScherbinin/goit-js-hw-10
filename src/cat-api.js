import axios from 'axios';

const API_KEY =
  'live_uJvepMw55H1CoZSaq4YK8d9QsKFG9pNSGGx2QVZwkuRc5HafRLIev1ihosGcKhqt';
axios.defaults.headers.common['x-api-key'] = 'live_uJvepMw55H1CoZSaq4YK8d9QsKFG9pNSGGx2QVZwkuRc5HafRLIev1ihosGcKhqt';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return axios.get(url).then(response => response.data);
};

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  console.log(axios.get(url).then(response => response.data));
  return axios.get(url).then(response => response.data);
};

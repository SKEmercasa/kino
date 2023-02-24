import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'e31aab8fda1203103cfabacdbfe624e6';

export async function getCard(page, search) {
  const response = await axios.get(`${baseURL}/search/movie?api_key=${apiKey}&query=${search}&page=${page}`);
  return await response.data;
}

export async function getInfo() {
  const response = await axios.get(`${baseURL}/genre/movie/list?api_key=${apiKey}`);
  return await response.data;
}

export async function getGuest() {
  const tokenSession = axios.get(`${baseURL}/authentication/guest_session/new?api_key=${apiKey}`);
  return (await tokenSession).data;
}

export async function postGuestRating(id, stars) {
  let guest = localStorage.getItem('session');
  const rate = axios.post(`${baseURL}/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guest}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    value: stars,
  });
  return (await rate).data;
}

export async function getRated() {
  let store = localStorage.getItem('session');
  const movieRated = axios.get(`${baseURL}/guest_session/${store}/rated/movies?api_key=${apiKey}`);
  return (await movieRated).data;
}

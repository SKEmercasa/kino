import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = 'e31aab8fda1203103cfabacdbfe624e6';

export async function getCard(page, search) {
  try {
    const response = await axios.get(`${baseURL}/search/movie?api_key=${apiKey}&query=${search}&page=${page}`);
    return await response.data;
  } catch (error) {
    console.error(error, 'GC');
  }
}

export async function getInfo() {
  try {
    const response = await axios.get(`${baseURL}/genre/movie/list?api_key=${apiKey}`);
    return await response.data;
  } catch (error) {
    console.error(error, 'GI');
  }
}

export async function getGuest() {
  try {
    const tokenSession = axios.get(`${baseURL}/authentication/guest_session/new?api_key=${apiKey}`);
    return (await tokenSession).data;
  } catch (error) {
    console.error(error, 'GG');
  }
}

export async function postGuestRating(id, stars) {
  let guest = localStorage.getItem('session');
  try {
    const rate = axios.post(`${baseURL}/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${guest}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      value: stars,
    });
    return (await rate).data;
  } catch (error) {
    console.error(error, 'PGR');
  }
}

export async function getRated() {
  try {
    let store = localStorage.getItem('session');
    const movieRated = axios.get(`${baseURL}/guest_session/${store}/rated/movies?api_key=${apiKey}`);
    return (await movieRated).data;
  } catch (error) {
    console.error(error, 'GR');
  }
}

import Cookies from 'js-cookie';

export function setUsername(value: string) {
  return Cookies.set('username', value);
}

export function getUsername() {
  return Cookies.get('username');
}

export function setGoing(id: string, value: boolean) {
  return Cookies.set(`events/${id}/going`, `${value}`);
}

export function getGoing(id: string) {
  return Cookies.get(`events/${id}/going`) === 'true';
}

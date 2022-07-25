
export function setPlanetsInSession(planets) {
  window.sessionStorage.setItem('planets', JSON.stringify(planets));
}

export function getPlanetsFromSession() {
  let j = window.sessionStorage.getItem('planets');
  return JSON.parse(j);
}
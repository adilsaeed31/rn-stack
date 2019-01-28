// @flow
export default class Fetcher {
  // baseurl for ombd api
  static baseUrl: string = `http://localhost:8000/api/search`;
  // get method return json response
  static get(params?: mixed) {
    return fetch(`${Fetcher.baseUrl}?keyword=${params.search}`).then(res =>
      res.json()
    );
  }
}

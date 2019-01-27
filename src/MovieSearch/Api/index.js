// @flow
export default class Fetcher {
  // api key of omdb api
  static apiKey: string = "f887b97";
  // baseurl for ombd api
  static baseUrl: string = `http://www.omdbapi.com/?apikey=${Fetcher.apiKey}`;
  // get method return json response
  static get(params?: mixed) {
    return fetch(`${Fetcher.baseUrl}&s=${params.search}`).then(res =>
      res.json()
    );
  }
}

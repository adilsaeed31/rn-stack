// @flow

// type assignment
import type MovieTypes from "../Types";

export default class MovieSearchModel {
  constructor(props: MovieTypes) {
    this.initialize(props);
  }

  initialize(props: MovieTypes) {
    this.id = props.imdbID || "N/A";
    this.title = props.Title || "No Title";
    this.poster = props.Poster || null;
    this.type = props.Type || "N/A";
    this.year = props.Year || "N/A";
  }
}

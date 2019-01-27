// @flow
import * as React from "react";

// Connect redux with component
import { connect } from "react-redux";

// Reducer Actions
import { movieSuccess, movieProgress, movieFailure } from "./Actions";

// Components
import InfoRow from "./Components/InfoRow";
import NothingFound from "./Components/NothingFound";

// Type assignment
import { MovieTypes } from "./Types";

// Api Service
import Fetcher from "./Api";

// Model
import MovieSearchModel from "./Model";

type Props = {
  records: Array<MovieTypes>
};

type State = {
  q: string,
  isFirstLoad: boolean
};

class MovieSearch extends React.PureComponent<Props, State> {
  state = {
    q: "",
    isFirstLoad: true
  };

  handleSearch = () => {
    let { q } = this.state;
    // dispatching progress action to store
    this.props.dispatch(movieProgress());
    // API call to fetch data
    Fetcher.get({ search: q })
      .then(res => {
        if (res.Response === "True") {
          let data = [];
          // Process the modal entity against data here
          data = res.Search.map(item => new MovieSearchModel(item));
          // dispatch data to redux store for props mapping
          this.props.dispatch(movieSuccess(data));
          this.setState({ isFirstLoad: false });
        } else {
          this.props.dispatch(movieFailure());
        }
      })
      .catch(res => {
        // dispatch failure props mapping
        this.props.dispatch(movieFailure());
      });
  };

  handleReset = () => {
    this.setState({
      q: "",
      isFirstLoad: true
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderMovies = () => {
    return this.props.records.map((item, key) => (
      <InfoRow key={key} item={item} />
    ));
  };

  render() {
    let { q, isFirstLoad } = this.state;
    let { records } = this.props;
    return (
      <React.Fragment>
        <section className="section isBG">
          <div className="container has-text-centered is-bottom-2">
            <div className="columns">
              <div className="column is-full">
                <h1 className="title has-text-white is-family-primary">
                  Online Movie Search
                </h1>
                <h2 className="subtitle has-text-white is-family-monospace">
                  OMDB Search Tool
                </h2>
              </div>
            </div>

            <div className="columns">
              <div className="column is-4 is-offset-4">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="q"
                      onChange={this.onChange}
                      value={q}
                      placeholder="Search for Movie"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-4 is-offset-4">
                <button
                  className="button is-success"
                  onClick={this.handleSearch}
                >
                  <span className="icon is-small">
                    <i className="fas fa-search" />
                  </span>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
          {!isFirstLoad && (
            <div className="container">
              <div className="columns">
                <div className="column is-offset-4-desktop is-one-third-desktop is-full-touch">
                  <button
                    className="button is-fullwidth"
                    onClick={this.handleReset}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-undo" />
                    </span>
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
        {records.length > 0 ? (
          <section className="section">
            <div className="container is-bottom-2">
              <div className="columns has-background-light is-i-bottom-2">
                {this.renderMovies()}
              </div>
            </div>
          </section>
        ) : (
          !isFirstLoad && <NothingFound />
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mapStateToProps = ({ MovieSearchReducer }) => ({
  records: MovieSearchReducer.records,
  isLoading: MovieSearchReducer.isLoading,
  hasError: MovieSearchReducer.hasError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieSearch);

// @flow
import * as React from "react";

// Connect redux with component
import { connect } from "react-redux";

// Reducer Actions
import { movieSuccess, movieProgress, movieFailure } from "./Actions";

// Components
import InfoRow from "./Components/InfoRow";
import NothingFound from "./Components/NothingFound";
import { DebounceInput } from "react-debounce-input";

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

    if (q.trim().length > 0) {
      // dispatching progress action to store
      this.props.dispatch(movieProgress());
      // API call to fetch data
      Fetcher.get({ search: q })
        .then(async res => {
          if (res.status === 200) {
            // Process the modal entity against data here
            let data = await res.data.map(item => new MovieSearchModel(item));
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
    }
  };

  handleReset = () => {
    this.setState({
      q: "",
      isFirstLoad: true
    });
  };

  onChange = e => {
    this.setState(
      {
        q: e.target.value
      },
      () => this.watchProps()
    );
  };

  watchProps = () => {
    this.handleSearch();
  };

  renderItems = items => {
    return items.map((item, key) => (
      <InfoRow key={key} index={key} item={item} />
    ));
  };

  renderMovies = () => {
    return this.props.records.map((item, key) => {
      return (
        <div key={key} className="columns is-mobile">
          {this.renderItems(item)}
        </div>
      );
    });
  };

  render() {
    let { isFirstLoad } = this.state;
    let { records, isLoading } = this.props;
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
                    <DebounceInput
                      className="input"
                      type="text"
                      name="q"
                      minLength={3}
                      debounceTimeout={300}
                      onChange={this.onChange}
                      placeholder="Search for Movie"
                    />
                  </div>
                </div>
                {isLoading && (
                  <p className="has-text-centered has-text-white">
                    Loading Please wait ...!
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
        {records.length > 0 && !isFirstLoad ? (
          <section className="section">
            <div className="container">{this.renderMovies()}</div>
          </section>
        ) : (
          records.length === 0 && !isFirstLoad && <NothingFound />
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

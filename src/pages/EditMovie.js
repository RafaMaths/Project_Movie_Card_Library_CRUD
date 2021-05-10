import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MovieForm, Loading } from '../components';
// import { updateMovie, getMovie } from '../services/movieAPI';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      shouldRedirect: false,
      status: 'loading',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateMovie = this.handleUpdateMovie.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const movie = await movieAPI.getMovie(id);
    this.handleUpdateMovie(movie);
  }

  async handleSubmit(updatedMovie) {
    // const { movieAPI } = this.props;
    await movieAPI.updateMovie(updatedMovie);
    this.setState({ shouldRedirect: true });
  }

  handleUpdateMovie(movie) {
    this.setState({
      movie,
      status: true,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditMovie;

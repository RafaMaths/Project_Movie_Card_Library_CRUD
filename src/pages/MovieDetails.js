import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import { deleteMovie } from '../services/movieAPI';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: [],
      loading: true,
    };

    this.movieGetAPI = this.movieGetAPI.bind(this);
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
  }

  componentDidMount() {
    return this.movieGetAPI();
  }

  componentWillUnmount() {
    return this.handleDeleteMovie();
  }

  async handleDeleteMovie() {
    const { match: { params: { id } } } = this.props;
    const deleteDataMovie = await movieAPI.deleteMovie(id);
    return this.setState({
      movie: deleteDataMovie,
    });
  }

  async movieGetAPI() {
    const { match: { params: { id } } } = this.props;
    const getAPI = await movieAPI.getMovie(id);
    return this.setState({
      movie: getAPI,
      loading: false,
    });
  }

  // cardDataDetails() {
  //   const { movie } = this.state;
  //   const { match: { params: { id } } } = this.props;
  //   const { title, storyline, imagePath, genre, rating, subtitle } = movie;

  //   return (
  //     <div data-testid="movie-details">
  //       <img alt="Movie Cover" src={ `../${imagePath}` } />
  //       <h2>{ `Title: ${title}` }</h2>
  //       <p>{ `Subtitle: ${subtitle}` }</p>
  //       <p>{ `Storyline: ${storyline}` }</p>
  //       <p>{ `Genre: ${genre}` }</p>
  //       <p>{ `Rating: ${rating}` }</p>
  //       <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
  //       <Link to="/">VOLTAR</Link>
  //     </div>
  //   );
  // }

  render() {
    const { movie, loading } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = movie;
    const renderMovie = (
      <div data-testid="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <h2>{ `Title: ${title}` }</h2>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/">VOLTAR</Link>
        <Link to="/">DELETAR</Link>
      </div>
    );
    return (
      loading ? <Loading /> : renderMovie
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;

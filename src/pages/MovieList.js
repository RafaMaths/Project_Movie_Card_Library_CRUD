import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };

    this.movieGetAPI = this.movieGetAPI.bind(this);
  }

  componentDidMount() {
    return this.movieGetAPI();
  }

  async movieGetAPI() {
    const getAPI = await movieAPI.getMovies();
    return this.setState({
      movies: getAPI,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;

    return (
      <div>
        <Link to="/movies/new">ADICIONAR CARTÃO</Link>
        <div data-testid="movie-list">
          {loading ? <Loading /> : movies.map((movie) => (<MovieCard
            key={ movie.title }
            movie={ movie }
          />))}
        </div>
      </div>
    );
  }
}

export default MovieList;

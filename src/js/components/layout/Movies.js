import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux"

import { fetchMovies } from "../../actions/movieActions"

@connect((store) => {
  return {
    movies: store.movies.movies
  };
})


export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    };
  }

  componentDidMount(){
    this.props.dispatch(fetchMovies())
  }


  render() {
    const { location,movies } = this.props;

    var mappedMovies = "No Movies... :( ";

    if(!(movies.length == 0)){

      mappedMovies = movies['movies'].map(movie =>
        <div class='col-md-6'>
          <div class='movie'>{movie['title']}</div>
        </div>
      )
    }

    return (
      <div className="right-wrapper">
        <div class='row'>
          {mappedMovies}
        </div>
      </div>
    );
  }
}

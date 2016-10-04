import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux"

import { fetchMovies } from "../actions/movieActions"

import Nav from "../components/layout/Nav";
import Sidebar from "../components/layout/Sidebar";
import Movies from "../components/layout/Movies";

require("../../style.scss");

@connect((store) => {
  return {
    movies: store.movies.movies
  };
})


export default class Layout extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchMovies())
  }

  render() {
    const { location, movies } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };



    return (

      <div>
        <Nav location={location} />
        <Sidebar/>
        <Movies/>

      </div>

    );

  }
}

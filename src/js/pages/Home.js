import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux"

import Sidebar from "../components/layout/Sidebar";
import Movies from "../components/layout/Movies";

require("../../style.scss");

@connect((store) => {
  return {
    movies: store.movies.movies
  };
})


export default class Home extends React.Component {

  render() {
    const { location, movies } = this.props;

    return (
      <div>
        <Sidebar ref="sidebar1"/>
        <Movies/>
      </div>
    );
  }
}

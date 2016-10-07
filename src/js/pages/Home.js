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
    var background = {
      backgroundImage : "url('../../bg.jpg')"
    }
    var overlay={
      backgroundImage : "url('../../overlay.png')"
    }
    return (
      <div>
        <div class='landing-image' style={background}>
          <div class='overlay' style={overlay}></div>
          <div class='parent'>
            <div class='child'><h1>Ratings From The U-Verse Featured Movies</h1></div>
          </div>
        </div>
        <div class='banner'>
        <ul class='score-wrap banner-scores'>
          <li class='scoreCard pink'>Average Rating</li>
          <li class='scoreCard orange'>IMDB Rating</li>
          <li class='scoreCard blue'></li>
        </ul>
        </div>
      </div>
    );
  }
}

import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux"

import Sidebar from "../components/layout/Sidebar";
import Movies from "../components/layout/Movies";

import { fetchMovies } from "../actions/movieActions"

require("../../style.scss");

@connect((store) => {
  return {
    movies: store.movies.movies,
    movieData: store.movies.movieData,
    fetching: store.movies.fetching,
  };
})


export default class Home extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchMovies("All"));
  }

  buildList(fetching, movieData){
    var divs = [];
    if(fetching){
      for(var x = 0; x<movieData.length; x++){


        if(movieData[x]['Poster'] == "N/A" || movieData[x]['Poster'] == undefined){
          continue;
        }else{
          var style = {
            backgroundImage : "url('" + movieData[x]['Poster'] + "')"
          };
          divs.push(
            <div class='col-md-2 col-sm-3 col-xs-4'>
              <div class='posterPic' style={style}></div>
            </div>
          );
        }
      }
      return divs;
    }

  }


  render() {
    const { location, movies, movieData, fetching } = this.props;
    var background = {
      backgroundImage : "url('../../bg.jpg')"
    }
    var overlay={
      backgroundImage : "url('../../overlay.png')"
    }

    return (
      <div class='home'>
        <div class='home-overlay'>
          <div class='parent'>
            <div class='child'>
              <h1>U-Verse On Demand Featured Movie Ratings</h1>
              <a href="#/ratings"><div class='home-button'>Check Ratings</div></a>
            </div>

          </div>

        </div>
        {this.buildList(fetching, movieData)}
        {/* <div class='landing-image' style={background}>
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
        </div> */}
      </div>
    );
  }
}

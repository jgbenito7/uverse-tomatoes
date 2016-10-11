import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux"

import { fetchMovies } from "../../actions/movieActions"
import { fetchMovieData } from "../../actions/movieActions"
import { setFilter } from "../../actions/movieActions"
import { setCategory } from "../../actions/movieActions"

@connect((store) => {
  return {
    movieData: store.movies.movieData,
    category: store.movies.category,
    fetching: store.movies.fetching,
    fetched: store.movies.fetched,
    filter: store.movies.filter,
    loading: store.movies.loading
  };
})

export default class Movies extends React.Component {

  constructor() {
    super()
    this.state = {
      selected:'All'
    };
  }

  isActive(value){
    if(this.state.selected == value){
      return "active";
    }else{
      return "default";
    }
  }

  setSelected(value){
    //console.log(this)
     this.setState({
        selected: value
      })

      this.props.dispatch(setCategory(value));

   }


  componentDidMount(){
    this.props.dispatch(fetchMovies(this.props.category));
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.category!=this.props.category){
      this.props.dispatch(fetchMovies(nextProps.category));
    }
  }

  fetchMovieData(movies, i , limit, res){
    this.props.dispatch(fetchMovieData(movies, i , limit, res))
  }

  setFilter(filter){
    this.props.dispatch(setFilter(filter));
  }

  activeFilter(filter){
    return this.props.filter == filter ? "active" : "";
  }

  toggleModal(index){
    $('#myModal' + index).modal('show');
  }

  loader(){
    var divStyle = {
      backgroundImage: "url('../../../loader.GIF')"
    }
    if(this.props.fetched == false){
      return (
        <div class='centered'>
          <h1>Sit Tight While Our Ninjas Collect Movie Data...</h1>
          <div class='loader' style={divStyle}></div>
        </div>
      );
    }else{
      return "";
    }
  }

  buildSelectList(){
    const navElems = ["All", "Action-Adventure", "Comedy", "Drama", "Foreign Films", "Horror", "Independent", "Kids-Family", "Romance", "SciFi-Fantasy", "Suspense-Thriller"]

    const mappedNav = navElems.map(elem =>
      <div class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>
        <div class='side-wrap pad5'>
          <div class={"side-elem center-text margin-top-0 border-1px pad5 border-radius-3 " + this.isActive(elem)} onClick={this.setSelected.bind(this, elem)} ><a>{elem}</a></div>
        </div>
      </div>
    )
    return mappedNav;
  }


  render() {
      const { location,movies, movieData, category, fetching, fetched, filter, loading } = this.props;

      var mappedMovies = [];

      if(!fetching){ //no movie names
      }else{ //All data is good to go, let's map these suckers
        var mappedMovies = [];

        if(filter=="Average"){
          movieData.sort(function(a,b){
            var aScore = 0;
            var bScore = 0;
            if(a.imdbRating == "N/A" && a.Metascore == "N/A"){
              aScore = 0;
            }else if(a.imdbRating == "N/A"){
              aScore = parseFloat(a.Metascore);
            }else if(a.Metascore == "N/A"){
              aScore = parseFloat(a.imdbRating)*10;
            }else{
              aScore = (parseFloat(a.imdbRating)*10 + parseFloat(a.Metascore))/2;
            }

            if(b.imdbRating == "N/A" && b.Metascore == "N/A"){
              bScore = 0;
            }else if(b.imdbRating == "N/A"){
              bScore = parseFloat(b.Metascore);
            }else if(b.Metascore == "N/A"){
              bScore = parseFloat(b.imdbRating)*10;
              //console.log(a);
            }else{
              bScore = (parseFloat(b.imdbRating)*10 + parseFloat(b.Metascore))/2;
            }

            var sorter = bScore - aScore;
            return sorter;
          })
        }
        else if(filter=="IMDB"){
          movieData.sort(function(a,b){
            var first = (b.imdbRating == "N/A") ? 0 : parseFloat(b.imdbRating)
            var second = (a.imdbRating == "N/A") ? 0 : parseFloat(a.imdbRating)
            var sorter = first-second;
            return sorter;
          })
        }else if(filter=="Metascore"){
          movieData.sort(function(a,b){
            var first = b.Metascore == "N/A" ? 0 : parseFloat(b.Metascore)
            var second = a.Metascore == "N/A" ? 0 : parseFloat(a.Metascore)
            var sorter = first-second;
            return sorter;
          })
        }

        for(var m=0;m<movieData.length;m++){
          if(movieData[m]['Title']){
            var image = "../../../posters/" + movieData[m]['Poster'].substring(movieData[m]['Poster'].lastIndexOf('/')+1)
            var background = movieData[m]['Poster'] == "N/A" ? {background: "url('../../../ImageNotFound.png')"} : {background: "url(" + image + ")"};

            //Calculate the average score
            var avgScore = 0;
            if(movieData[m].imdbRating == "N/A" && movieData[m].Metascore == "N/A"){
              avgScore = "N/A";
            }else if(movieData[m].imdbRating == "N/A"){
              avgScore = parseFloat(movieData[m].Metascore);
            }else if(movieData[m].Metascore == "N/A"){
              avgScore = parseFloat(movieData[m].imdbRating)*10;
            }else{
              avgScore = (parseFloat(movieData[m].imdbRating)*10 + parseFloat(movieData[m].Metascore))/2;
            }

            mappedMovies.push(
              <div>
                <div key={"modal" + m} id={"myModal" + m} class="modal fade" role="dialog">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div class='movie'>
                          <div class='poster' style={ background }></div>
                          <div class='movieInfo'>
                            <h3 class='title'>{movieData[m]['Title']}</h3>
                            <ul class='score-wrap'>
                              <li class='scoreCard pink'>{avgScore}</li>
                              <li class='scoreCard orange'>{movieData[m]['imdbRating']}</li>
                              <li class='scoreCard blue'>{movieData[m]['Metascore']}</li>
                            </ul>
                            <p>Rated: {movieData[m]['Rated']}</p>
                            <p>Released: {movieData[m]['Released']}</p>
                            <p>Runtime: {movieData[m]['Runtime']}</p>
                          </div>
                        </div>
                        <div class='plot'>
                          <p>{movieData[m]['Plot']}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div key={m} class='col-sm-6 col-md-6 col-lg-4' onClick={this.toggleModal.bind(this,m.toString())}>
                    <div class='movie'>
                      <div class='poster' style={ background }></div>
                      <div class='movieInfo'>
                        <h3 class='title'>{movieData[m]['Title']}</h3>
                        <ul class='score-wrap'>
                          <li class='scoreCard pink'>{avgScore}</li>
                          <li class='scoreCard orange'>{movieData[m]['imdbRating']}</li>
                          <li class='scoreCard blue'>{movieData[m]['Metascore']}</li>
                        </ul>
                        <p>Rated: {movieData[m]['Rated']}</p>
                        <p>Released: {movieData[m]['Released']}</p>
                        <p>Genres: {movieData[m]['Genre']}</p>
                      </div>
                    </div>
                </div>
              </div>
            );
          }
        }
      }

    return (
      <div className="right-wrapper">
        <div class='filter-wrap margin-b-10 show900 hide'>
          <div class='row'>
            {this.buildSelectList()}
          </div>
        </div>
        <div class='filter-wrap'>
          <div class='filter-by-wrap'>
            <div class='row'>
              <div class='col-xs-3 hide900'>
                <div class='filter-text'>Select A Filter</div>
              </div>
              <div class='col-xs-3'>
                <div class={'filter-button filter-button-l ' + this.activeFilter('Average')} onClick={this.setFilter.bind(this,'Average')}>Average Rating</div>
              </div>
              <div class='col-xs-3'>
                <div class={'filter-button filter-button-c ' + this.activeFilter('IMDB')} onClick={this.setFilter.bind(this,'IMDB')}>IMDB Rating</div>
              </div>
              <div class='col-xs-3'>
                <div class={'filter-button filter-button-r ' + this.activeFilter('Metascore')} onClick={this.setFilter.bind(this,'Metascore')}>Metascore Rating</div>
              </div>
            </div>
          </div>
        </div>
        <div class='right-scroll'>
          <div class='row'>
            {mappedMovies}
          </div>
        </div>
      </div>

    );
  }
}

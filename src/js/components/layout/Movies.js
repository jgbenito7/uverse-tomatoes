import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux"

import { fetchMovies } from "../../actions/movieActions"
import { fetchMovieData } from "../../actions/movieActions"
import { setFilter } from "../../actions/movieActions"

@connect((store) => {
  return {
    movies: store.movies.movies,
    movieData: store.movies.movieData,
    category: store.movies.category,
    fetching: store.movies.fetching,
    fetched: store.movies.fetched,
    filter: store.movies.filter,
    loading: store.movies.loading
  };
})

export default class Movies extends React.Component {

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
    //console.log(this.props.fetched);
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

  render() {
      const { location,movies, movieData, category, fetching, fetched, filter, loading } = this.props;

      var mappedMovies = [];

      if(!fetching){ //no movie names
      }else{ //All data is good to go, let's map these suckers
        var mappedMovies = [];

        // for(var x=0;x<movieData.length;x++){ //Get rid of the movies that crapped out.
        //   if(movieData[x].Response == "False"){
        //     movieData.splice(x,1);
        //   }
        // }


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
            //console.log(a);console.log(b);
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
            var background = movieData[m]['Poster'] == "N/A" ? {background: "url('../../../ImageNotFound.png')"} : {background: "url(" + movieData[m]['Poster'] + ")"};

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
                    {/* <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Modal Header</h4>
                    </div> */}
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
                    {/* <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div> */}
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
                                        <p>Runtime: {movieData[m]['Runtime']}</p>


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
          {/* {this.loader()} */}
          <div class='row'>
            {mappedMovies}
          </div>
        </div>
      </div>

    );
  }
}

import axios from "axios";

export function fetchMovies(category) {
  return function(dispatch) {
    axios.get("../../data/" + category + ".json")
      .then((response) => {
        dispatch({type: "FETCH_MOVIES_FULLFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIES_REJECTED", payload: err})
      })
  }
}

export function fetchMovieData(movies, i , limit, res) {
  console.log(i);

  if(i==limit){
    return function(dispatch) {
      dispatch({type: "FETCH_MOVIE_DATA_FULLFILLED", payload: res});
    }
  }
  return function(dispatch) {
    var title = movies[i]['title'];
    axios.get("http://www.omdbapi.com",{
      params:{
        t:title
      }
    })
      .then((response) => {
        res.push(response.data);
        dispatch(fetchMovieData(movies,i+1,limit,res));
      })
      .catch((err) => {
        res.push(err);
        dispatch(fetchMovieData(movies,i+1,limit,res));
      })
  }
}

export function setCategory(category){
  return function(dispatch) {
    dispatch({type: "SET_CATEGORY",payload: {category: category}});
  }
}

export function setFilter(filter){
  return function(dispatch) {
    dispatch({type: "SET_FILTER",payload: {filter: filter}});
  }
}

import axios from "axios";

export function fetchMovies() {
  return function(dispatch) {
    axios.get("../../scraped/All.json")
      .then((response) => {
        console.log(response);
        dispatch({type: "FETCH_MOVIES_FULLFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_MOVIES_REJECTED", payload: err})
      })
  }
}

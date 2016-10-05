export default function reducer(state={
    movies:[],
    movieData:[],
    fetching: false,
    fetched: false,
    error: null,
    category: "All",
    filter: "Average",
    loading: 0
  }, action) {

    switch (action.type) {
      case "FETCH_MOVIES": {
        return {...state, fetching: true}
      }
      case "FETCH_MOVIES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_MOVIES_FULLFILLED": {
        return {...state, fetching: true, fetched: false, movies: action.payload}
      }
      case "FETCH_MOVIE_DATA_FULLFILLED": {
        return {
          ...state,
          fetching: true,
          fetched: true,
          movieData: action.payload
        }
      }
      case "FETCH_MOVIE_DATA_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "SET_CATEGORY":{
        return {...state,category:action.payload['category']}
      }

      case "SET_FILTER":{
        return {...state,filter:action.payload['filter']}
      }
      case "SET_LOADING":{
        return {...state,loading:action.payload}
      }
    }

    return state
}

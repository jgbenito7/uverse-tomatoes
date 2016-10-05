import React from "react";
import { IndexLink, Link } from "react-router";
import { connect } from "react-redux"

import { setCategory } from "../../actions/movieActions"

@connect((store) => {
  return {
    category: store.movies.category
  };
})


export default class Sidebar extends React.Component {
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


  render() {
    const { location } = this.props;
    console.log(this.props);
    const navElems = ["All", "Action-Adventure", "Comedy", "Drama", "Foreign Films", "Horror", "Independent", "Kids-Family", "Romance", "SciFi-Fantasy", "Suspense-Thriller"]

    const mappedNav = navElems.map(elem =>
      <div class='side-wrap'>
        <div class={"side-elem " + this.isActive(elem)} onClick={this.setSelected.bind(this, elem)}>
          <a>{elem}</a>
        </div>
      </div>
    )

    return (
      <div className="left-nav-wrapper">
        <div class="left-nav">
          <div class='side-wrap side-wrap-title'>
            <div class='side-title'>
              Categories
            </div>
          </div>
          {mappedNav}
        </div>
      </div>
    );
  }
}

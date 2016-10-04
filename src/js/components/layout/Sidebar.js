import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    };
  }


  render() {
    const { location } = this.props;
    const navElems = ["All", "Action-Adventure", "Comedy", "Drama", "Foreign Films", "Horror", "Independent", "Kids-Family", "Romance", "SciFi-Fantasy", "Suspense-Thriller"]

    const mappedNav = navElems.map(elem =>
      <div class='side-wrap'>
        <div class='side-elem'>
          <a>{elem}</a>
        </div>
      </div>
    )

    return (
      <div className="left-nav-wrapper">
        {mappedNav}
      </div>
    );
  }
}

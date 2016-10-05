import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux"

import Nav from "../components/layout/Nav";

require("../../style.scss");

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Nav location={location} />
        <div class='main-wrap'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

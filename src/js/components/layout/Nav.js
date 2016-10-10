import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  setActive(value){
    //console.log(this.props.location);
    if(this.props.location.pathname == value){
      return "active";
    }else{
      return "";
    }
  }



  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

  //  console.log(location);

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div class="navbar-header">
          <div class="logo">U-Verse Ratings</div>
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <div class="logo">U-Verse Ratings</div>
            <ul class="nav navbar-nav">
              <li class={this.setActive("/")} >
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li class={this.setActive("/ratings")} >
                <IndexLink to="/ratings" onClick={this.toggleCollapse.bind(this)}>Ratings</IndexLink>
              </li>
              {/* <li activeClassName="active">
                <Link to="archives" onClick={this.toggleCollapse.bind(this)}>About Us</Link>
              </li> */}
            </ul>
          </div>

      </nav>
    );
  }
}

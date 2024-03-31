import React from "react";
import "./Home.css";
export default class RegisterButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a id="nav-link " className="nav-link" href="/register">
        Register
      </a>
    );
  }
}

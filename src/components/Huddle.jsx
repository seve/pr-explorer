import React, { Component } from 'react';
// import { Query } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import query from '../queries';
import data from '../data.json';


export default class Huddle extends Component {
  constructor(props) {
    super(props);

    // const users = data[this.props.match];
    this.state = {
      // users,
    };
  }

  render() {
    return (
      <Router>
        {/* <Query {...{query}} params={}>

      </Query> */}
        <p>TEST</p>
      </Router>
    );
  }
}

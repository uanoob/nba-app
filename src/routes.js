import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from './hoc/Layout/layout';
import Home from "./components/Home/home";

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import NewsMain from './components/Articles/News/Main';
import NewsArticle from './components/Articles/News/Post';
import VideoArticle from './components/Articles/Videos/Video';
import VideosMain from './components/Articles/Videos/Main';
import SignIn from './components/Signin/signin';


class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/news" exact component={NewsMain} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/videos/:id" exact component={VideoArticle} />
          <Route path="/videos" exact component={VideosMain} />
          <Route path="/signin" exact component={SignIn} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/layout';
import Home from './components/Home/home';
import NewsMain from './components/Articles/News/Main';
import NewsArticle from './components/Articles/News/Post';
import VideoArticle from './components/Articles/Videos/Video';
import VideosMain from './components/Articles/Videos/Main';
import SignIn from './components/Signin/signin';
import Dashboard from './components/Dashboard/dashboard';

const Routes = props => {
  return (
    <Layout user={props.user}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" exact component={NewsMain} />
        <Route path="/articles/:id" exact component={NewsArticle} />
        <Route path="/videos/:id" exact component={VideoArticle} />
        <Route path="/videos" exact component={VideosMain} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Layout>
  );
};

export default Routes;

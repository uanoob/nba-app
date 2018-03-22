import React, { Component } from 'react';

import {
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
} from '../../../firebase';

import styles from './videosList.css';

import Button from '../Buttons/buttons';
import VideosListTemplate from './videosListTemplate';

class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount,
  };

  componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    if (this.state.teams.length < 1) {
      firebaseTeams.once('value').then(snapshot => {
        const teams = firebaseLooper(snapshot);
        this.setState({
          teams,
        });
      });
    }

    firebaseVideos
      .orderByChild('id')
      .startAt(start)
      .endAt(end)
      .once('value')
      .then(snapshot => {
        const videos = firebaseLooper(snapshot);
        this.setState({
          videos: [...this.state.videos, ...videos],
          start,
          end,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderVideos = () => {
    let template = null;

    switch (this.props.type) {
      case 'card':
        template = (
          <VideosListTemplate
            data={this.state.videos}
            teams={this.state.teams}
          />
        );
        break;
      default:
        template = null;
    }
    return template;
  };

  loadMore = () => {
    this.request(this.state.end + 1, this.state.end + this.state.amount);
  };

  renderButton = () => {
    return this.props.loadmore ? (
      <Button
        type="loadmore"
        cta="Load More Videos"
        loadMore={() => this.loadMore()}
      />
    ) : (
      <Button type="linkTo" cta="More Videos" linkTo="/videos" />
    );
  };

  renderTitle = () => {
    return this.props.title ? (
      <h3>
        <strong>NBA</strong>Videos
      </h3>
    ) : null;
  };

  render() {
    return (
      <div className={styles.videosList_wrapper}>
        {this.renderTitle()}
        {this.renderVideos()}
        {this.renderButton()}
      </div>
    );
  }
}

export default VideosList;

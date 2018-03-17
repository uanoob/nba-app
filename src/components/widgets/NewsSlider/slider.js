import React, { Component } from 'react';

import axios from 'axios';

import SliderTemplates from './sliderTemplates';

class NewsSlider extends Component {
  state = {
    news: [],
  };

  componentWillMount() {
    axios
      .get(`http://localhost:3003/articles?_start=0&_end=3`)
      .then(response => {
        this.setState({
          news: response.data,
        });
      });
  }

  render() {
    console.log(this.state.news);
    return (
      <div>
        <SliderTemplates data={this.state.news} type="featured" />
      </div>
    );
  }
}

export default NewsSlider;

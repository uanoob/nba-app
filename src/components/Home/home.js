import React from 'react';

import SliderNews from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/newsList';

const Home = () => {
  return (
    <div>
      <SliderNews
        type="featured"
        start={0}
        amount={3}
        settings={{ dots: false }}
      />
      <NewsList type="card" loadmore={true} start={2} amount={4} />
    </div>
  );
};

export default Home;

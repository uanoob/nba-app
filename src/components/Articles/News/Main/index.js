import React from 'react';

import NewsSlider from '../../../widgets/NewsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList';

const NewsMain = () => {
  return (
    <div>
      <NewsSlider
        type="featured"
        settings={{ dots: false }}
        start={0}
        amount={3}
      />
      <NewsList type="cardMain" loadmore={true} start={3} amount={2} />
    </div>
  );
};

export default NewsMain;

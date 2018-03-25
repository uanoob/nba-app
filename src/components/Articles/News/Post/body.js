import React from 'react';

import styles from '../../articles.css';

const Body = props => {
  return (
    <div className={styles.articleBody}>
      <h1>{props.title}</h1>
      <div
        className={styles.articleImage}
        style={{
          background: `url('${props.imageURL}')`,
        }}
      />
      <div
        className={styles.articleText}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
    </div>
  );
};

export default Body;

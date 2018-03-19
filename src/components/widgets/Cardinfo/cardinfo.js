import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './cardinfo.css';

const Cardinfo = props => {
  const getTeamName = (teams, team) => {
    let data = teams.find(item => {
      return item.id === team;
    });
    if (data) {
      return data.name;
    }
  };

  return (
    <div className={styles.cardInfo}>
      <span className={styles.teamName}>
        {getTeamName(props.teams, props.team)}
      </span>
      <span className={styles.date}>
        <FontAwesome name="clock-o" />
        {props.date}
      </span>
    </div>
  );
};

export default Cardinfo;

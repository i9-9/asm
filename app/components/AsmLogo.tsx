import React from 'react';
import styles from "../components/CSS_Modules/ASMLogo.module.css"

const ASMLogo = () => {
  return (
    <div className={styles.logo}>
      <div className={`${styles.node} ${styles.node1}`} />
      <div className={`${styles.node} ${styles.node2}`} />
      <div className={`${styles.node} ${styles.node3}`} />
      <div className={`${styles.node} ${styles.node4}`} />
      <div className={`${styles.node} ${styles.node5}`} />
    </div>
  );
};

export default ASMLogo;

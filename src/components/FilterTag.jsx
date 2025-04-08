import React from 'react';
import styles from '../styles/HomePage.module.css';

const FilterTag = ({ value, onRemove }) => {
  return (
    <div className={styles.filterTag}>
      {value}
      <span 
        className={styles.filterTagClose}
        onClick={() => onRemove(value)}
      >
        ×
      </span>
    </div>
  );
};

export default FilterTag; 
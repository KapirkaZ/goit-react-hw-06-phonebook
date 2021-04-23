import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={styles.filterstyle}>
      Find contacts by name
      <input
        className={styles.inputstyle}
        type="text"
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onchangeFilter: PropTypes.func.isRequired,
};

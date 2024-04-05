import React from 'react';
import Theme from '../theme/theme';

import styles from "./sidebar.module.css"

// компонент бокового меню
const SideBar = ({isOpen}) => {
  return (
    <div id="sidebar" className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
        <Theme/>
        <p>Расписание звонков</p>
      </div>
  )
}

export default SideBar
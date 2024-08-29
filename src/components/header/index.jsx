import { NavLink } from "react-router-dom";
import ROUTES from '@/constants/routes'
import styles from './style.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
        <span className={styles.icon}></span>
        <h1 className={styles.text}>QuanJi Music</h1>
        <NavLink
          className={styles.mine}
          to={ROUTES.USERCENTER}
        >
            <i className={styles.IconMine}></i>
        </NavLink>
    </div>
  )
}

export default Header

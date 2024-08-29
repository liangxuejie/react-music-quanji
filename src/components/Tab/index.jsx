import styles from './style.module.scss'
import { NavLink } from "react-router-dom";
import cn from 'classnames'

const tabs = [
  {
    name: '推荐',
    path: '/recommend'
  },
  {
    name: '歌手',
    path: '/singer'
  },
  {
    name: '排行',
    path: '/topList'
  },
  {
    name: '搜索',
    path: '/search'
  }
]

const Tab = () => {
  return (
    <div className={styles.tab}>
      {tabs.map((tab) => (
        <NavLink
          className={({ isActive }) => isActive ? cn(styles.tabItem, styles.tabLinkActive) : styles.tabItem}
          key={tab.path}
          to={tab.path}>
          <span className={styles.tabLink}>
            {tab.name}
          </span>
        </NavLink>
      ))}
    </div>
  )
}

export default Tab

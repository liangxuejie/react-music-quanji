import styles from './style.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
        <span className={styles.icon}></span>
        <h1 className={styles.text}>QuanJi Music</h1>
        <a className={styles.mine}>
            <i className={styles.IconMine}></i>
        </a>
    </div>
  )
}

export default Header

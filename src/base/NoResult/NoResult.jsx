import styles from './style.module.scss'

const NoResult = ({title = '抱歉，没有结果'}) => {
  return (
    <div className={styles.noResult}>
      <div className={styles.noResultContent}>
        <div className={styles.icon}></div>
        <p className={styles.text}>{title}</p>
      </div>
    </div>
  )
}

export default NoResult

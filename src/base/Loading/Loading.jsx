import styles from './style.module.scss'
import gif from './loading.gif'

const Loading = ({title = '正在载入...'}) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingContent}>
        <img width="24" height="24" src={gif}></img>
        <p className={styles.desc}>{title}</p>
      </div>
    </div>
  )
}

export default Loading

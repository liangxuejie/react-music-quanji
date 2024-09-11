import styles from './style.module.scss'
import cn from 'classnames'

const SongList = ({songs, rank, selectItem}) => {

  function getDesc(song) {
    return `${song.singer}·${song.album}`
  }
  function getRankCls(index) {
    if (index <= 2) {
      return cn(styles.icon, styles[`icon${index}`])
    } else {
      return styles.text
    }
  }
  function getRankText(index) {
    if (index > 2) {
      return index + 1
    }
  }

  return (
    <ul className={styles.songList}>
      {songs?.map((song, index) => {
        return (
          <li 
            className={styles.item}
            key={song.id}
            onClick={() => selectItem({song, index})}
          >
            {rank && (
              <div className={styles.rank}>
                <div className={getRankCls(index)}>
                  { getRankText(index) }
                </div>
              </div>
            )}
            <div className={styles.content}>
              <h2 className={styles.name}>{song.name}</h2>
              <p className={styles.desc}>{getDesc(song)}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SongList

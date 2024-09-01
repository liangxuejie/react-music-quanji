import styles from './style.module.scss'

const SongList = ({songs, rank, selectItem}) => {

  const getDesc = (song) => {
    return `${song.singer}·${song.album}`
  }

  return (
    <ul className={styles.songList}>
      {songs?.map((song, index) => {
        return (
          <li 
          className={styles.item}
          key={song.id}
          onClick={() => selectItem(song, index)}
          >
            {rank && (
              <div className={styles.rank}>
                {/* <div className={getRankCls(index)}>
                  { getRankText(index) }
                </div> */}
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

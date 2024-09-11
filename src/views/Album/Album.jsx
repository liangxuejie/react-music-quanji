import MusicListWrap from '@/components/MusicListWrap/MusicListWrap'
import { useLocation } from "react-router-dom"
import { ALBUM_KEY } from '@/assets/js/constant'
import { getAlbum } from '@/service/recommend'
import styles from './style.module.scss'

const Album = () => {
  const location = useLocation();
  return (
    <div className={styles.album}>
      <MusicListWrap
            wrapData={location.state?.selectedData}
            storageKey={ALBUM_KEY}
            fetch={getAlbum}
      ></MusicListWrap>
    </div>
  )
}

export default Album

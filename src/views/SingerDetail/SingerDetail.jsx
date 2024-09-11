import MusicListWrap from '@/components/MusicListWrap/MusicListWrap'
import { useLocation } from "react-router-dom"
import { SINGER_KEY } from '@/assets/js/constant'
import { getSingerDetail } from '@/service/singer'
import styles from './style.module.scss'

const SingerDetail = () => {
  const location = useLocation();
  return (
    <div className={styles.singerDetail}>
      <MusicListWrap
            wrapData={location.state?.selectedData}
            storageKey={SINGER_KEY}
            fetch={getSingerDetail}
      ></MusicListWrap>
    </div>
  )
}

export default SingerDetail

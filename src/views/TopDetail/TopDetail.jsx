import MusicListWrap from '@/components/MusicListWrap/MusicListWrap'
import { useLocation } from "react-router-dom"
import { TOP_KEY } from '@/assets/js/constant'
import { getTopDetail } from '@/service/topList'
import styles from './style.module.scss'

const TopDetail = () => {
  const location = useLocation();
  return (
    <div className={styles.topDetail}>
      <MusicListWrap
            wrapData={location.state?.selectedData}
            storageKey={TOP_KEY}
            fetch={getTopDetail}
            rank={true}
      ></MusicListWrap>
    </div>
  )
}

export default TopDetail

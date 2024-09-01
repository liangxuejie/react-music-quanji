import MusicList from '@/components/MusicList/MusicList'
import { useState, useEffect, useMemo} from 'react'
import storage from 'good-storage'
import { useParams, useMatches, useNavigate } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import { processSongs } from '@/service/song'
import useMountedState from '@/hooks/useMountedState'
import styles from './style.module.scss'

const MusicListWrap = ({wrapData = {}, storageKey = '', fetch}) => {
  const { albumId } = useParams()
  // const matches = useMatches();
  const navigate = useNavigate()
  const isMounted = useMountedState()
  const [songsList, setSongsList] = useState([])
  const [loading, setLoading] = useState(true)

  const computedData = useMemo(() => {
    let ret = null
    const data = wrapData
    if (data) {
      ret = data
    } else {
      const cached = storage.session.get(storageKey)
      if (cached && (cached.mid || cached.id + '') === albumId) {
        ret = cached
      }
    }
    return ret
  }, [wrapData, storageKey])
  const pic = useMemo(() => {
    const data = computedData
    return data && data.pic
  }, [computedData])
  const title = useMemo(() => {
    const data = computedData
    return data && (data.name || data.title)
  }, [computedData])
  
  useEffect(() => {
    const data = computedData
    // console.log('matches', matches[0].pathname)
    if (!data) {
        // const path = matches[0].pathname
        navigate(ROUTES.RECOMMEND)
        return
    }
    async function fetchData() {
      const result = await fetch(data.id)
      const songs = await processSongs(result.songs)
      if (isMounted()) {
        setSongsList(songs)
        setLoading(false)
      }
    }
    fetchData();
  }, [fetch])

  return (
    <div className={styles.musicListWarp}>
      <MusicList
        songs={songsList}
        loading={loading}
        title={title}
        pic={pic}
      ></MusicList>
    </div>
  )
}

export default MusicListWrap

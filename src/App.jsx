import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import Header from '@/components/Header/Header'
import Tab from '@/components/Tab/Tab'
import Player from '@/components/Player/Player'
import playMusicReducer, { initialState, PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from '@/reducers/playMusic'
import { load, saveAll } from '@/assets/js/array-store'
import { FAVORITE_KEY, PLAY_KEY } from '@/assets/js/constant'
import { processSongs } from '@/service/song'

const { lazy, Suspense, useReducer } = React
const Recommend = lazy(() => import('@/views/Recommend/Recommend'))
const Singer = lazy(() => import('@/views/Singer/Singer'))
const TopList = lazy(() => import('@/views/TopList/TopList'))
const Search = lazy(() => import('@/views/Search/Search'))
const UserCenter = lazy(() => import('@/views/UserCenter/UserCenter'))

function App() {
  const [playState, playDispath] = useReducer(playMusicReducer, initialState)
  const favoriteSongs = load(FAVORITE_KEY)
  if (favoriteSongs.length > 0) {
    processSongs(favoriteSongs).then((songs) => {
      playDispath({
        type: ACTIONS.SET_FAVORITE_LIST,
        payload: {
          favoriteList: songs,
        },
      })
      saveAll(songs, FAVORITE_KEY)
    })
  }

  return (
    <>
      <PlayMusicDispatchContext.Provider value={playDispath}>
        <PlayMusicStateContext.Provider value={playState}>
          <Header></Header>
          <Tab></Tab>
          <Suspense fallback={null}>
            <Routes>
              <Route path={`${ROUTES.RECOMMEND}/*`} element={<Recommend/>} />
              <Route path={ROUTES.SINGER} element={<Singer/>} />
              <Route path={ROUTES.TOPLIST} element={<TopList/>} />
              <Route path={ROUTES.SEARCH} element={<Search/>} />
              <Route path={ROUTES.USERCENTER} element={<UserCenter/>} />
              <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.DEFAULT_ROUTE} />} />
              {/* <Route path="*" element={<Navigate to={ROUTES.ROOT} />} /> */}
            </Routes>
          </Suspense>
          <Player></Player>
        </PlayMusicStateContext.Provider>
      </PlayMusicDispatchContext.Provider>
    </>
  )
}

export default App

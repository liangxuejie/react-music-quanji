import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ROUTES from '@/constants/routes'
import Header from '@/components/Header'
import Tab from '@/components/Tab'

const { lazy, Suspense } = React
const Recommend = lazy(() => import('@/views/Recommend'))
const Singer = lazy(() => import('@/views/Singer'))
const TopList = lazy(() => import('@/views/TopList'))
const Search = lazy(() => import('@/views/Search'))
const UserCenter = lazy(() => import('@/views/UserCenter'))

function App() {
  return (
    <>
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
    </>
  )
}

export default App

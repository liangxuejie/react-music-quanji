import { get } from './base'

export function getRecommend() {
  return get('/api/getRecommend')
}

export function getAlbum(albumId) {
  return get('/api/getAlbum', {
    id: albumId
  })
}

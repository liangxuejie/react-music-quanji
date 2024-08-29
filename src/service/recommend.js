import { get } from './base'

export function getRecommend() {
  return get('/use/api/getRecommend')
}

export function getAlbum(albumId) {
  return get('/use/api/getAlbum', {
    id: albumId
  })
}

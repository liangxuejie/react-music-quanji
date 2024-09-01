import React from 'react'
import { PLAY_MODE } from '@/assets/js/constant'

const SELECT_PLAY = 'SELECT_PLAY'
const RANDOM_PLAY = 'RANDOM_PLAY'
export const ACTIONS = {
  SELECT_PLAY,
  RANDOM_PLAY,
}
export const initialState = {
  sequenceList: [],
  playlist: [],
  playingState: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: [],
}

const playMusicReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_PLAY: {
      return {
        ...state,
        playMode: PLAY_MODE.sequence,
        sequenceList: payload.list,
        playingState: true,
        fullScreen: true,
        playlist: payload.list,
        currentIndex: payload.index,
      }
    }
    case ACTIONS.RANDOM_PLAY: {
      return {
        ...state,
        playMode: PLAY_MODE.random,
        sequenceList: payload.list,
        playingState: true,
        fullScreen: true,
        playlist: shuffle(payload.list),
        currentIndex: 0,
      }
    }
    default:
      return state
  }
}
export default playMusicReducer

export const PlayMusicStateContext = React.createContext(initialState)
export const PlayMusicDispatchContext = React.createContext(() => {})

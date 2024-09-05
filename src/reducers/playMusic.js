import React from 'react'
import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

const SELECT_PLAY = 'SELECT_PLAY'
const RANDOM_PLAY = 'RANDOM_PLAY'
const ADD_SONG_LYRIC = 'ADD_SONG_LYRIC'
const SET_FULL_SCREEN = 'SET_FULL_SCREEN'
const SET_PLAY_MODE = 'SET_PLAY_MODE'
const SET_PLAYING_STATE = 'SET_PLAYING_STATE'
const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'
const SET_FAVORITE_LIST = 'SET_FAVORITE_LIST'
const SET_PLAY_HISTORY = 'SET_PLAY_HISTORY'

export const ACTIONS = {
  SELECT_PLAY,
  RANDOM_PLAY,
  ADD_SONG_LYRIC,
  SET_FULL_SCREEN,
  SET_PLAY_MODE,
  SET_PLAYING_STATE,
  SET_CURRENT_INDEX,
  SET_FAVORITE_LIST,
  SET_PLAY_HISTORY,
}
export const initialState = {
  sequenceList: [],
  playlist: [],
  playingState: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: [],
  playHistory: [],
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
    case ACTIONS.ADD_SONG_LYRIC: {
      state.sequenceList.map((item) => {
        if (item.mid === payload.song.mid) {
          item.lyric = payload.lyric
        }
        return item
      })
      return {
        ...state,
      }
    }
    case ACTIONS.SET_FULL_SCREEN: {
      return {
        ...state,
        fullScreen: payload.fullScreen,
      }
    }
    case ACTIONS.SET_PLAY_MODE: {
      return {
        ...state,
        playMode: payload.playMode,
      }
    }
    case ACTIONS.SET_PLAYING_STATE: {
      return {
        ...state,
        playingState: payload.playingState,
      }
    }
    case ACTIONS.SET_CURRENT_INDEX: {
      return {
        ...state,
        currentIndex: payload.currentIndex,
      }
    }
    case ACTIONS.SET_FAVORITE_LIST: {
      return {
        ...state,
        favoriteList: payload.favoriteList
      }
    }
    case ACTIONS.SET_PLAY_HISTORY: {
      return {
        ...state,
        playHistory: payload.playHistory
      }
    }
    default:
      return state
  }
}
export default playMusicReducer

export const PlayMusicStateContext = React.createContext(initialState)
export const PlayMusicDispatchContext = React.createContext(() => {})

import React from 'react'
import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

const SELECT_PLAY = 'SELECT_PLAY'
const RANDOM_PLAY = 'RANDOM_PLAY'
const ADD_SONG_LYRIC = 'ADD_SONG_LYRIC'
const CHANGE_MODE = 'CHANGE_MODE'
const REMOVE_SONG = 'REMOVE_SONG'
const CLEAR_SONG_LIST = 'CLEAR_SONG_LIST'

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
  CHANGE_MODE,
  REMOVE_SONG,
  CLEAR_SONG_LIST,

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
    case ACTIONS.CHANGE_MODE: {
      const currentSong = state.playlist[state.currentIndex]
      const currentId = currentSong.id
      let list = []
      if (payload.playMode === PLAY_MODE.random) {
        list = shuffle(state.sequenceList)
      } else {
        list = state.sequenceList
      }
      const index = list.findIndex((song) => {
        return song.id === currentId
      })

      return {
        ...state,
        playlist: list,
        currentIndex: index,
        playMode: payload.playMode,
      }
    }
    case ACTIONS.REMOVE_SONG: {
      const sequenceList = state.sequenceList.slice()
      const playlist = state.playlist.slice()
    
      const sequenceIndex = findIndex(sequenceList, payload.song)
      const playIndex = findIndex(playlist, payload.song)
      if (sequenceIndex < 0 || playIndex < 0) {
        return
      }
    
      sequenceList.splice(sequenceIndex, 1)
      playlist.splice(playIndex, 1)
    
      let currentIndex = state.currentIndex
      if (playIndex < currentIndex || currentIndex === playlist.length) {
        currentIndex--
      }
    
      let playingState = state.playingState
      if (!playlist.length) {
        playingState = false
      }
      return {
        ...state,
        sequenceList: sequenceList,
        playlist: playlist,
        currentIndex: currentIndex,
        playingState: playingState,
      }
    }
    case ACTIONS.CLEAR_SONG_LIST: {
      return {
        ...state,
        sequenceList: [],
        playlist: [],
        currentIndex: 0,
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

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

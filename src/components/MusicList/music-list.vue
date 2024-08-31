<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ props.title }}</h1>
    <div
      class="bg-image"
      :style="bgImageStyle"
      ref="bgImageRef"
    >
      <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          v-show="props.songs.length > 0"
          class="play-btn"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div
        class="filter"
        :style="filterStyle"
      ></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      v-loading="props.loading"
      v-no-result:[props.noResultText]="noResult"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <SongList
          :songs="props.songs"
          @select="selectItem"
          :rank="props.rank"
        ></SongList>
      </div>
    </scroll>
  </div>
</template>

<script setup>
  import { onMounted, reactive, computed, ref } from 'vue'
  import SongList from '@/base/song-list/song-list.vue'
  import Scroll from '@/components/wrap-scroll'
  // import { mapActions, mapState } from 'vuex'
  import { useRoute, useRouter} from 'vue-router'

  const RESERVED_HEIGHT = 40
  const router = useRouter()
  const bgImageRef = ref(null)
  const props = defineProps({
        songs: {
          type: Array,
          default() {
            return []
          }
        },
        title: String,
        pic: String,
        loading: Boolean,
        noResultText: {
          type: String,
          default: '抱歉，没有找到可播放的歌曲'
        },
        rank: Boolean
    })
  const state = reactive({
        imageHeight: 0,
        scrollY: 0,
        maxTranslateY: 0
  })
  const noResult = computed(() => {
    return !props.loading && !props.songs.length
  })
  const playBtnStyle = computed(() => {
        let display = ''
        if (state.scrollY >= state.maxTranslateY) {
          display = 'none'
        }
        return {
          display
        }
  })
  const bgImageStyle = computed(() => {
        const scrollY = state.scrollY
        let zIndex = 0
        let paddingTop = '70%'
        let height = 0
        let translateZ = 0

        if (scrollY > state.maxTranslateY) {
          zIndex = 10
          paddingTop = 0
          height = `${RESERVED_HEIGHT}px`
          translateZ = 1
        }

        let scale = 1
        if (scrollY < 0) {
          scale = 1 + Math.abs(scrollY / state.imageHeight)
        }
        return {
          zIndex,
          paddingTop,
          height,
          backgroundImage: `url(${props.pic})`,
          transform: `scale(${scale})translateZ(${translateZ}px)`
        }
  })
  const scrollStyle = computed(() => {
        // const bottom = this.playlist.length ? '60px' : '0'
        const bottom = '0'
        return {
          top: `${state.imageHeight}px`,
          bottom
        }
  })
  const filterStyle = computed(() => {
        let blur = 0
        const scrollY = state.scrollY
        const imageHeight = state.imageHeight
        if (scrollY >= 0) {
          blur = Math.min(state.maxTranslateY / imageHeight, scrollY / imageHeight) * 20
        }
        return {
          backdropFilter: `blur(${blur}px)`
        }
  })
  // ...mapState([
  //   'playlist'
  // ])
  onMounted(() => {
    state.imageHeight = bgImageRef.value.clientHeight
    state.maxTranslateY = state.imageHeight - RESERVED_HEIGHT 
  })
  function goBack() {
    router.back()
  }
  function onScroll(pos) {
    state.scrollY = -pos.y
  }
  function selectItem({ song, index }) {
      // this.selectPlay({
      //   list: props.songs,
      //   index
      // })
  }
  function random() {
    // this.randomPlay(props.songs)
  }
  // ...mapActions([
  //   'selectPlay',
  //   'randomPlay'
  // ])
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>

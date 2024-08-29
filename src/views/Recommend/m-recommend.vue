<template>
  <div class="recommend" v-loading="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <m-slider v-if="data.sliders.length" :sliders="data.sliders"></m-slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in data.albums"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic">
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{item.title}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="data.selectedAlbum"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import { onMounted, reactive, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { getRecommend } from '@/service/recommend'
  import mSlider from '@/base/slider/m-slider.vue'
  import Scroll from '@/components/wrap-scroll'
  import storage from 'good-storage'
  import { ALBUM_KEY } from '@/assets/js/constant'

  const router = useRouter()
  const data = reactive({
    sliders: [],
    albums: [],
    selectedAlbum: null
  })
  onMounted(async () => {
    const result = await getRecommend()
    data.sliders = result.sliders
    data.albums = result.albums
  })
  const loading = computed(() => {
    return !data.sliders.length && !data.albums.length
  })
  function selectItem(album) {
    data.selectedAlbum = album
    cacheAlbum(album)
    router.push({
      path: `/recommend/${album.id}`
    })
  }
  function cacheAlbum(album) {
    storage.session.set(ALBUM_KEY, album)
  }
</script>

<style lang="scss" scoped>
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    overflow: scroll;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;
        .slider-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;

          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
          }
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .title {
            color: $color-text-d;
          }
        }
      }
    }
  }
</style>

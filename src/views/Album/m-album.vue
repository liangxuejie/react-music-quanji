<template>
  <div class="album">
    <MusicListWrap
      :wrapData="props.data"
      :storageKey="ALBUM_KEY"
      :fetch="getAlbum"
    ></MusicListWrap>
  </div>
</template>

<script setup>
  import MusicListWrap from '@/components/music-list-wrap/music-list-wrap.vue'
  import { getAlbum } from '@/service/recommend'
  import { ALBUM_KEY } from '@/assets/js/constant'

  const props = defineProps({
        data: { 
            type: Object,
        },
    })
</script>

<style lang="scss" scoped>
  .album {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>

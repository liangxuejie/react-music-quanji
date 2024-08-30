<template>
    <div class="music-list-warp">
        <MusicList
            :songs="state.songs"
            :title="title"
            :pic="pic"
            :loading="state.loading"
        ></MusicList>
    </div>
</template>

<script setup>
    import { onMounted, reactive, computed } from 'vue'
    import MusicList from '@/components/music-list/music-list.vue'
    import storage from 'good-storage'
    import { processSongs } from '@/service/song'
    import { useRoute, useRouter} from 'vue-router'

    const route = useRoute()
    const router = useRouter()
    const props = defineProps({
        wrapData: { 
            type: Object,
            default() {
                return {}
            }
        },
        storageKey: {
            type: String,
            default: ''
        },
        fetch: {
            type: Function,
        },
    })
    const state = reactive({
        songs: [],
        loading: true
    })
    const computedData = computed(() => {
        let ret = null
        const data = props.wrapData
        if (data) {
          ret = data
        } else {
          const cached = storage.session.get(props.storageKey)
          if (cached && (cached.mid || cached.id + '') === route.params.id) {
            ret = cached
          }
        }
        return ret
    })
    const pic = computed(() => {
        const data = computedData
        return data.value && data.value.pic
    })
    const title = computed(() => {
        const data = computedData
        return data.value && (data.value.name || data.value.title)
    })
    onMounted(async() => {
        const data = computedData
        console.log('route.matched', route.matched)
        if (!data) {
            const path = route.matched[0].path
            router.push({
                path
            })
            return
        }
        const result = await props.fetch(data.value.id)
        state.songs = await processSongs(result.songs)
        state.loading = false
    })

</script>

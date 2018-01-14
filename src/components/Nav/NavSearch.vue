<template lang='pug'>
  .search
    input.input.is-rounded(
      type='text'
      placeholder='Search...'
      v-model='query'
    )
    .results(v-if='query.length > 0')
      ais-index(
        v-for='key in keys'
        :key='key.index'
        :app-id='id'
        :api-key='key.key'
        :index-name='key.index'
        :query='query'
        :auto-search='false'
        :query-parameters='parameters'
      )
        ais-results
          div(slot='header')
            p.heading {{ key.index.split('_')[1] }}
          template(slot-scope='{ result }')
            router-link(
              v-if='key.index === "production_users"'
              :to='{ name: "profile", params: { slug: result.slug } }'
            )
              img(v-if='result.avatar' :src='result.avatar.tiny')
              img(v-else src='/default_avatar.png')
              ais-highlight(:result='result' attribute-name='name')

            router-link(
              v-if='key.index === "production_media"'
              :to='{ name: result.kind, params: { slug: result.slug } }'
            )
              img(v-if='result.posterImage' :src='result.posterImage.tiny')
              img(v-else src='/default_avatar.png')
              ais-highlight(:result='result' attribute-name='canonicalTitle')

            router-link(
              v-if='key.index === "production_groups"'
              :to='{ name: "groups", params: { slug: result.slug } }'
            )
              img(v-if='result.avatar' :src='result.avatar.tiny')
              img(v-else src='/default_avatar.png')
              ais-highlight(:result='result' attribute-name='name')
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        query: '',
        parameters: {
          attributesToHighlight: '*',
          hitsPerPage: 3,
          highlightPreTag: '<strong>',
          highlightPostTag: '</strong>'
        },
        id: 'AWQO5J657S',
        keys: []
      }
    },
    methods: {
      async getKeys () {
        if (this.keys.length === 0) {
          const { data } = await axios.get('https://kitsu.io/api/edge/algolia-keys')
          this.keys = Object.keys(data)
            .map(key => data[key])
            .filter(obj => obj.index !== 'production_posts')
        }
      }
    },
    mounted () {
      this.getKeys()
    }
  }
</script>

<style lang='sass'>
  .search
    width: 16rem
    height: 100%
    line-height: 1rem
    display: flex
    align-items: center

  input.input
    background: var(--colour-tolopea)
    border: 1px solid var(--colour-tolopea)
    color: var(--colour-whiteSmoke)
    &:hover
      border-color: var(--colour-cinnabar)
    &::placeholder
      color: var(--colour-whiteSmoke)

  .heading
    color: var(--colour-whiteSmoke)
    padding-left: .5rem

  .results
    position: absolute
    top: 52px
    background: var(--colour-haiti)
    border-radius: 0 0 .25rem .25rem
    width: 16rem
    a
      display: block
      padding: .5rem
      display: flex
      align-items: center
      color: var(--colour-whiteSmoke)
      &:hover
        color: var(--colour-cinnabar)
    img
      height: 1.5rem
      width: 1.5rem
      border-radius: 999rem
      margin-right: .75rem
</style>

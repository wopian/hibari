<template lang='pug'>
  section.container
    .row
      .left.col-md-8.col-sm-12
        .title
          span {{ $t('user.sociability.title') }}
        //- TODO: Split this into a reusable component
        .sociability.row
          .card.card-block
            p.card-title(v-if='profile') {{ profile.postsCount }}
            p.card-title.loading(v-else)
            p.card-text {{ $t('user.sociability.postsCount') }}
          .card.card-block
            p.card-title(v-if='profile') {{ profile.commentsCount }}
            p.card-title.loading(v-else)
            p.card-text {{ $t('user.sociability.commentsCount') }}
          .card.card-block
            p.card-title(v-if='profile') {{ profile.likesGivenCount }}
            p.card-title.loading(v-else)
            p.card-text {{ $t('user.sociability.likesGivenCount') }}
          .card.card-block
            p.card-title(v-if='profile') {{ profile.likesReceivedCount }}
            p.card-title.loading(v-else)
            p.card-text {{ $t('user.sociability.likesReceivedCount') }}
          .card.card-block
            p.card-title(v-if='profile') {{ profile.followingCount }}
            p.card-title.loading(v-else)
            p.card-text {{ $t('user.sociability.followingCount') }}
          .card.card-block
            p.card-title(v-if='profile') {{ profile.followersCount }}
            p.card-title.loading(v-else)
            p.card-text {{ $t('user.sociability.followersCount') }}

        .title
          span Recent Anime Activity
        //- TODO: Split this into a reusable component
        .recent-activity.row(v-if='$store.state.user[$route.params.slug] && libraryDownloaded.anime')
          droppler.col-6.col-sm-3(
            v-for='entry in getRecent("anime")'
            v-bind:key='entry.anime.slug'
            openOn='hover'
            classes='media-tooltip'
            constrainToWindow='true'
            constrainToScrollParent='true'
            remove='true'
            position='right center'
          )
            router-link.card(
              slot='drop-trigger'
              v-bind:to='"/anime/" + entry.anime.slug'
            )
              img.card-img-top(:src='entry.anime.posterImage')

            .media-box(slot='drop-content')
              .media-title {{ entry.anime.canonicalTitle }}
              .media-rating(
                v-if='entry.anime.averageRating'
                v-bind:class='colourAverageRating(entry.anime.averageRating)'
              ) {{ entry.anime.averageRating }}%
              .media-synopsis {{ entry.anime.synopsis }}
              .library
                .library-status {{ $t('user.library.status.anime.' + entry.status) }}
                .library-progress {{ $t('user.library.mediaBox.episode', { episode: entry.progress, total: entry.anime.episodeCount || '∞' }) }}
                .library-rating(v-if='entry.ratingTwenty') {{ $t('user.library.mediaBox.rating', { rating: entry.ratingTwenty / 2 }) }}
                .library-rating(v-else) Unrated
                .library-updated {{ humanise(entry.updatedAt) }}

        .title
          span Anime Stats
        .row
          genres.col-6(v-bind:chartData='chartGenres')

        .title
          span Manga Stats

      //-
        //- DUMP START
        .title
          span 🚧 User State Dump 🚧
        details(v-if='profile')
          summary Profile
          pre {{ profile }}
        details(v-if='library')
          summary Library
          pre {{ library }}
        //- DUMP END

      .right.col-md-4.col-sm-12(v-if='profile')
        .title
          span About Me
        //- TODO: Split this into a reusable component
        p.os {{ profile.about }}
        p.waifu(v-if='profile.waifu') {{ profile.waifu.name }}
          span {{ profile.waifuOrHusbando }}

        //- TODO: Split this into a reusable component
        .favourites(v-if='profile.favorites')
          .title
            span Favourites
          ul.nav.nav-pills.nav-justified
            li.nav-item
              a.nav-link(
                :class='{ active: favoritesPanel === "anime" }'
                @click='favoritesPanel = "anime"'
              ) Anime
            li.nav-item
              a.nav-link(
                :class='{ active: favoritesPanel === "manga" }'
                @click='favoritesPanel = "manga"'
              ) Manga
            li.nav-item
              a.nav-link(
                :class='{ active: favoritesPanel === "characters" }'
                @click='favoritesPanel = "characters"'
              ) Characters

          //- start: favourites container
          .tab-content
            //- Display anime favourites when active
            .tab-pane.active(v-if='favoritesPanel === "anime" && profile.favorites.anime.length > 0')
              paginate(
                name='favAnime'
                v-bind:list='profile.favorites.anime'
                v-bind:per='16'
                tag='div'
                class='row'
              )
                .col-3(v-for='fav in paginated("favAnime")')
                  router-link(:to='"/anime/" + fav.item.slug')
                    img(v-bind:src='fav.item.posterImage ? fav.item.posterImage.small : "/kitsu/default_poster.jpg"')
              paginate-links(
                for='favAnime'
                v-bind:simple='{ prev: "Back", next: "Next" }'
                v-bind:hide-single-page='true'
                v-bind:classes='{ ".next > a": "btn", ".prev > a": "btn" }'
              )
            p(v-else-if='favoritesPanel === "anime" && profile.favorites.manga.length === 0') No favourite anime

            //- Display manga favourites when active
            .tab-pane.active(v-else-if='favoritesPanel === "manga" && profile.favorites.manga.length > 0')
              paginate(
                name='favManga'
                v-bind:list='profile.favorites.manga'
                v-bind:per='16'
                tag='div'
                class='row'
              )
                .col-3(v-for='fav in paginated("favManga")')
                  router-link(:to='"/manga/" + fav.item.slug')
                    img(v-bind:src='fav.item.posterImage ? fav.item.posterImage.small : "/kitsu/default_poster.jpg"')
              paginate-links(
                for='favManga'
                v-bind:simple='{ prev: "Back", next: "Next" }'
                v-bind:hide-single-page='true'
                v-bind:classes='{ ".next > a": "btn", ".prev > a": "btn" }'
              )
            p(v-else-if='favoritesPanel === "manga" && profile.favorites.manga.length === 0') No favourite manga

            //- Display character favourites when active
            .tab-pane.active(v-else-if='favoritesPanel === "characters" && profile.favorites.characters.length > 0')
              paginate(
                name='favCharacters'
                v-bind:list='profile.favorites.characters'
                v-bind:per='16'
                tag='div'
                class='row'
              )
                .col-3(v-for='fav in paginated("favCharacters")')
                  a
                    img(v-bind:src='fav.item.image ? fav.item.image.original : "/kitsu/default_poster.jpg"')
              paginate-links(
                for='favCharacters'
                v-bind:simple='{ prev: "Back", next: "Next" }'
                v-bind:hide-single-page='true'
                v-bind:classes='{ ".next > a": "btn", ".prev > a": "btn" }'
              )
            p(v-else-if='favoritesPanel === "characters" && profile.favorites.characters.length === 0') No favourite characters
          //- stop: favourites container
    p {{ libraryDownloaded }} - if 'false' it either errored or is still loading
</template>

<script>
  import Droppler from 'vue-droppler'
  import Genres from 'components/charts/Genres'
  import libraryEntryMixin from 'util/libraryEntryMixin'

  export default {
    mixins: [libraryEntryMixin],
    metaInfo: {
      title: 'Profile'
    },
    props: [
      'slug',
      'profile',
      'libraryDownloaded'
    ],
    components: {
      Droppler,
      Genres
    },
    data () {
      return {
        error: null,
        paginate: ['favAnime', 'favManga', 'favCharacters'],
        favoritesPanel: 'anime',
        stats: {},
        chartGenres: {
          labels: ['Kitsu', 'Hibari', 'MyAnimeList'],
          datasets: [
            {
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              data: [40, 20, 5]
            }
          ]
        }
      }
    },
    methods: {
      getRecent (kind = 'anime') {
        return this.$store.state.user[this.$route.params.slug].library[kind].slice(0, 8)
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~styles/variables

  pre
    max-height: 10rem * 1.5

  section.container
    padding: 0 15px
    margin-top: 30px

    @include media-breakpoint-up(sm)
      &
        padding: 0

    .right
      order: -1
      padding-left: 2px
      @include media-breakpoint-up(md)
        order: 1

    .sociability
      display: flex
      flex-flow: row wrap
      padding-left: 7px
      padding-right: 7px

    .card
      text-align: center
      box-shadow: 0 1px 4px rgba($black, .04)
      border: 1px solid rgba($black, .09)
      margin: 0 7.5px 15px
      min-width: 10rem
      p:first-of-type
        font-size: 2rem
        margin-bottom: 0

    .favourites
      p
        margin-top: 1rem
        text-align: center
      a
        font-size: 12px
      .row
        margin: 15px -2px 0
        > div
          padding: 0 3px
        a
          border-radius: 3px
          overflow: hidden
          display: inline-block
      img
        width: 100%
        max-width: 100%
        vertical-align: middle
      ul:not(.paginate-links)
        position: sticky
        top: 54.78px + 42px
        z-index: 1
        background: rgba($white, .96)
        margin: -15px 0
        padding: 15px 0
        .active
          color: $white
          background: $primary
        a:not(.active)
          cursor: pointer
          transition: color 200ms ease-in-out
          &:hover
            color: $kitsu
            transition: color 100ms ease-in-out

  .loading
    overflow: hidden
    height: 3rem
    vertical-align: text-bottom
    &:after
      display: inline-table
      white-space: pre
      text-align: left
      content: '⠋\a⠙\a⠹\a⠸\a⠼\a⠴\a⠦\a⠧\a⠇\a⠏'
      animation: spin10 1s steps(10, end) infinite

  @keyframes spin10
    to
      transform: translateY(-15.0em)

  .col-6.col-sm-3
    position: relative

    img
      width: 100%
      height: auto
</style>

<style lang='sass'>
  @import ~styles/variables

  .paginate-links
    list-style: none
    padding: 9px 0
    margin-bottom: 0
    display: flex
    .prev,
    .next
      flex: 1 1 100%
      text-align: center
      a
        width: 100%
        height: 30px
        font-size: 12px
        cursor: not-allowed
        line-height: 1.5
        padding: .5em 0
    .prev:not(.disabled),
    .next:not(.disabled)
      .btn
        background: $primary
        color: $white
        cursor: pointer
    .prev
      padding-right: 3px
    .next
      padding-left: 3px
</style>

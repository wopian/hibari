<template lang='pug'>
  section.container(v-if='user')
    .row
      .left.col-md-8.col-sm-12
        .title
          span {{ $t('user.sociability.title') }}
        .sociability.row
          .card.card-block
            p.card-title {{ user.postsCount }}
            p.card-text {{ $t('user.sociability.postsCount') }}
          .card.card-block
            p.card-title {{ user.commentsCount }}
            p.card-text {{ $t('user.sociability.commentsCount') }}
          .card.card-block
            p.card-title {{ user.likesGivenCount }}
            p.card-text {{ $t('user.sociability.likesGivenCount') }}
          .card.card-block
            p.card-title {{ user.likesReceivedCount }}
            p.card-text {{ $t('user.sociability.likesReceivedCount') }}
          .card.card-block
            p.card-title {{ user.followingCount }}
            p.card-text {{ $t('user.sociability.followingCount') }}
          .card.card-block
            p.card-title {{ user.followersCount }}
            p.card-text {{ $t('user.sociability.followersCount') }}

        .title
          span Recent Activity
        .recent-activity.row
          .col-3(v-for='n in 4')
            img(src='//media.kitsu.io/anime/poster_images/11178/small.jpg?1452886316')

        .title
          span Anime Stats

        .title
          span Manga Stats

        //- RAW API DUMP START
        .title
          span API User
        details
          summary Show
          pre(v-if='user') {{ user }}
        //- RAW API DUMP END

      .right.col-md-4.col-sm-12
        .title
          span About Me
        p.os {{ user.about }}
        p.waifu(v-if='user.waifu') {{ user.waifu.name }}
          span {{ user.waifuOrHusbando }}
        .favourites(v-if='user.favorites')
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
            .tab-pane.active(v-if='favoritesPanel === "anime" && user.favorites.anime.length > 0')
              paginate(
                name='favAnime'
                v-bind:list='user.favorites.anime'
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
            p(v-else-if='favoritesPanel === "anime" && user.favorites.manga.length === 0') No favourite anime

            //- Display manga favourites when active
            .tab-pane.active(v-else-if='favoritesPanel === "manga" && user.favorites.manga.length > 0')
              paginate(
                name='favManga'
                v-bind:list='user.favorites.manga'
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
            p(v-else-if='favoritesPanel === "manga" && user.favorites.manga.length === 0') No favourite manga

            //- Display character favourites when active
            .tab-pane.active(v-else-if='favoritesPanel === "characters" && user.favorites.characters.length > 0')
              paginate(
                name='favCharacters'
                v-bind:list='user.favorites.characters'
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
            p(v-else-if='favoritesPanel === "characters" && user.favorites.characters.length === 0') No favourite characters
          //- stop: favourites container
</template>

<script>
  export default {
    metaInfo: {
      title: 'Profile'
    },
    props: [
      'slug',
      'user'
    ],
    data () {
      return {
        error: null,
        paginate: ['favAnime', 'favManga', 'favCharacters'],
        favoritesPanel: 'anime'
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~styles/variables

  section.container
    padding: 0 15px
    margin-top: 30px

    @include media-breakpoint-up(sm)
      &
        padding: 0

    .right
      order: -1
      @include media-breakpoint-up(md)
        order: 1

    .sociability
      display: flex
      flex-flow: row wrap

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

    .recent-activity
      margin-bottom: 30px
      margin-left: -7.5px
      margin-right: -7.5px
      div
        padding: 0 7.5px
      img
        width: 100%
        max-width: 100%
        vertical-align: middle
        border-radius: 3px
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

<template lang='pug'>
  b-dropdown(position='is-bottom-left')
    .navbar-item.has-dropdown(slot='trigger')
      a.navbar-link
        span {{ $store.state.auth.my.name }}

    b-dropdown-item(has-link)
      router-link(:to='{ name: "profile", params: { slug: $store.state.auth.my.slug } }') {{ $t('loggedIn.profile') }}

    hr.dropdown-divider

    // TODO: Language switcher in nav dropdown when logged in
      b-dropdown-item
        language(menu)

    b-dropdown-item(has-link)
      router-link(:to='{ name: "preferences" }')  {{ $t('loggedIn.preferences') }}

    b-dropdown-item(has-link)
      a(@click='$store.commit("LOGOUT")' href='javascript:;')  {{ $t('loggedIn.logout') }}
</template>

<script>
  export default {
    // TODO: Language switcher in nav dropdown when logged in
  }
</script>

<style lang='sass' scoped>
  .navbar-link
    color: var(--colour-whiteSmoke)
</style>

<template lang='pug'>
  b-dropdown(position='is-bottom-left')
    .navbar-item.has-dropdown(slot='trigger')
      a.navbar-link
        span {{ $store.state.auth.my.name }}

    b-dropdown-item(has-link)
      router-link(:to='{ name: "Profile", params: { slug: $store.state.auth.my.slug } }') {{ $t('loggedIn.profile') }}

    hr.dropdown-divider

    b-dropdown-item(has-link)
      router-link(:to='{ name: "Preferences" }')  {{ $t('loggedIn.preferences') }}

    b-dropdown-item(has-link)
      a(@click='$store.commit("LOGOUT")' href='')  {{ $t('loggedIn.logout') }}
</template>

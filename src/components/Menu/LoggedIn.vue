<template lang='pug'>
  b-dropdown(position='is-bottom-left')
    .navbar-item.has-dropdown(slot='trigger')
      a.navbar-link
        span {{ $store.state.me.name }}

    b-dropdown-item(has-link)
      router-link(:to='{ name: "Profile", params: { slug: $store.state.me.name } }') Profile

    hr.dropdown-divider

    b-dropdown-item(has-link)
      router-link(:to='{ name: "Preferences" }') Preferences

    b-dropdown-item(has-link)
      a(@click='$store.commit("LOGOUT")' href='') Logout
</template>

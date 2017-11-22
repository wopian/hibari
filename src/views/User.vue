<template lang='pug'>
  section
    p Template for {{ $store.state.route.name }} @{{ $store.state.route.params.slug }}
    router-view
</template>

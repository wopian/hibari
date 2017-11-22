<template lang='pug'>
  section
    p View for {{ $store.state.route.name }} @{{ $store.state.route.params.slug }}
    router-view
</template>

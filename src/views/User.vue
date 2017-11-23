<template lang='pug'>
  section.container
    p View for {{ $store.state.route.name }} @{{ $store.state.route.params.slug }}
    router-view
</template>

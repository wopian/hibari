<script>
  export default {
    name: 'set-title',
    props: ['title'],
    created () {
      document.title = window.location.hostname === 'localhost' ? '[DEV] ' + this.title : this.title
    },
    watch: {
      title () {
        document.title = window.location.hostname === 'localhost' ? '[DEV] ' + this.title : this.title
      }
    },
    render () {
    }
}
</script>

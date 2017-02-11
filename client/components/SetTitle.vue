<script>
  export default {
    name: 'set-title',
    props: ['title'],
    created () {
      this.setTitle()
    },
    methods: {
      setTitle () {
        const checkDevelopment = window.location.hostname === 'localhost' ? '[DEV] ' : ''
        const checkRoot = this.title ? this.title + ' - Hibari' : 'Hibari'
        document.title = checkDevelopment + checkRoot
      }
    },
    render () {
    }
}
</script>

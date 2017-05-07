import moment from 'moment'

const libraryEntryMixin = {
  methods: {
    capitalise: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    humanise: function (time) {
      return this.capitalise(moment(time).fromNow())
    },
    colourAverageRating: function (rating) {
      if (!rating) return ''
      else if (rating <= 25) return 'awful'
      else if (rating <= 50) return 'meh'
      else if (rating <= 75) return 'good'
      else if (rating <= 100) return 'great'
    }
  }
}

export default libraryEntryMixin

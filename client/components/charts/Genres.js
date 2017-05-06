import { Doughnut, mixins } from 'vue-chartjs'

export default Doughnut.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData, {
      legend: {
        display: true,
        usePointStyle: true
      },
      cutoutPercentage: 70
    })
  }
})

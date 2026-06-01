<template>
  <div class="row">
    <!-- KPIs -->
    <div class="col-md-3" v-for="card in cards" :key="card.title">
      <CCard class="text-center shadow-sm mb-3">
        <CCardBody>
          <h5>{{ card.title }}</h5>
          <h2>{{ card.value }}</h2>
        </CCardBody>
      </CCard>
    </div>

    <!-- Gráfico ingresos vs saldos -->
    <div class="col-md-6">
      <CCard class="shadow-sm mb-3">
        <CCardHeader>Ingresos vs Saldos</CCardHeader>
        <CCardBody>
          <canvas id="chartIngresos"></canvas>
        </CCardBody>
      </CCard>
    </div>

    <!-- Gráfico citas por semana -->
    <div class="col-md-6">
      <CCard class="shadow-sm mb-3">
        <CCardHeader>Citas por Dia</CCardHeader>
        <CCardBody>
          <canvas id="chartCitas"></canvas>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      cards: [
        { title: 'Pacientes', value: 0 },
        { title: 'Citas Hoy', value: 0 },
        { title: 'Tratamientos', value: 0 },
        { title: 'Ingresos Totales Bs.', value: 0 }
      ]
    }
  },
  mounted() {
    this.cargarDashboard()
  },
  methods: {
    async cargarDashboard() {
     
      const res = await axios.get('/dashboard')

        this.cards[0].value = res.data.pacientes
        this.cards[1].value = res.data.citasHoy
        this.cards[2].value = res.data.tratamientos
        this.cards[3].value = res.data.ingresos


      new Chart(document.getElementById('chartIngresos'), {
        type: 'pie',
        data: {
          labels: ['Ingresos', 'Saldos'],
          datasets: [{ 
            data: [res.data.ingresos, res.data.saldos], 
            backgroundColor: ['#4caf50','#f44336'] }]
        }
      })

      // Gráfico citas por semana
        const labels = res.data.citasPorDia.map(c => c.dia)
      const data = res.data.citasPorDia.map(c => c.total)
    
      new Chart(document.getElementById('chartCitas'), {
       type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Citas',
            data,
            backgroundColor: '#2196f3'
          }]
        }
      })
    }
  }
}
</script>

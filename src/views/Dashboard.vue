<template>
<<<<<<< HEAD
  <div>
    <CRow>
      <CCol :xs="12" :sm="6" :lg="3">
        <CWidgetStatsA
          class="mb-4"
          color="primary"
          :value="cards[0].value.toString()"
          title="Pacientes"
        >
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon :icon="cilOptions" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="$router.push('/pacientes')">Ver Pacientes</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </template>
        </CWidgetStatsA>
      </CCol>
      <CCol :xs="12" :sm="6" :lg="3">
        <CWidgetStatsA
          class="mb-4"
          color="info"
          :value="cards[1].value.toString()"
          title="Citas Hoy"
        >
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon :icon="cilOptions" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="$router.push('/citas')">Ver Citas</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </template>
        </CWidgetStatsA>
      </CCol>
      <CCol :xs="12" :sm="6" :lg="3">
        <CWidgetStatsA
          class="mb-4"
          color="warning"
          :value="cards[2].value.toString()"
          title="Tratamientos"
        >
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon :icon="cilOptions" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="$router.push('/tratamientos')">Ver Tratamientos</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </template>
        </CWidgetStatsA>
      </CCol>
      <CCol :xs="12" :sm="6" :lg="3">
        <CWidgetStatsA
          class="mb-4"
          color="danger"
          :value="'Bs. ' + cards[3].value.toLocaleString()"
          title="Ingresos Totales"
        >
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon :icon="cilOptions" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="$router.push('/pagos')">Ver Pagos</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </template>
        </CWidgetStatsA>
      </CCol>
    </CRow>

    <CRow>
      <CCol :md="6">
        <CCard class="mb-4">
          <CCardHeader>Ingresos vs Saldos</CCardHeader>
          <CCardBody>
            <div class="c-chart-wrapper" style="height:300px;">
              <canvas id="chartIngresos"></canvas>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :md="6">
        <CCard class="mb-4">
          <CCardHeader>Citas por Día</CCardHeader>
          <CCardBody>
            <div class="c-chart-wrapper" style="height:300px;">
              <canvas id="chartCitas"></canvas>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
=======
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
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js/auto'
<<<<<<< HEAD
import { cilOptions } from '@coreui/icons'

export default {
  setup() {
    return {
      cilOptions,
    }
  },
=======

export default {
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
  data() {
    return {
      cards: [
        { title: 'Pacientes', value: 0 },
        { title: 'Citas Hoy', value: 0 },
        { title: 'Tratamientos', value: 0 },
<<<<<<< HEAD
        { title: 'Ingresos Totales', value: 0 }
=======
        { title: 'Ingresos Totales Bs.', value: 0 }
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
      ]
    }
  },
  mounted() {
    this.cargarDashboard()
  },
  methods: {
    async cargarDashboard() {
<<<<<<< HEAD
      try {
        const res = await axios.get('/dashboard')
=======
     
      const res = await axios.get('/dashboard')

>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
        this.cards[0].value = res.data.pacientes
        this.cards[1].value = res.data.citasHoy
        this.cards[2].value = res.data.tratamientos
        this.cards[3].value = res.data.ingresos

<<<<<<< HEAD
        this.renderCharts(res.data)
      } catch (error) {
        console.error('Error cargando dashboard:', error)
      }
    },
    renderCharts(data) {
      new Chart(document.getElementById('chartIngresos'), {
        type: 'doughnut',
        data: {
          labels: ['Ingresos', 'Saldos'],
          datasets: [{ 
            data: [data.ingresos, data.saldos], 
            backgroundColor: ['#4caf50','#f44336'],
            hoverOffset: 4
          }]
        },
        options: {
          maintainAspectRatio: false,
        }
      })

      const labels = data.citasPorDia.map(c => c.dia)
      const chartData = data.citasPorDia.map(c => c.total)
    
      new Chart(document.getElementById('chartCitas'), {
        type: 'bar',
=======

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
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
        data: {
          labels,
          datasets: [{
            label: 'Citas',
<<<<<<< HEAD
            data: chartData,
            backgroundColor: 'rgba(52, 152, 219, 0.8)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
=======
            data,
            backgroundColor: '#2196f3'
          }]
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
        }
      })
    }
  }
}
</script>
<<<<<<< HEAD

=======
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35

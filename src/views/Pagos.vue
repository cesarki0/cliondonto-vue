<template>
  <div class="row w-100">
    <div class="col-12">
      <CCard class="shadow-sm">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Control de Pagos</strong>
          <CButton color="primary" size="sm" @click="nuevoPago">Registrar Pago</CButton>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" responsive hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Tratamiento / Paciente</CTableHeaderCell>
                <CTableHeaderCell>Total Tratamiento</CTableHeaderCell>
                <CTableHeaderCell>Monto Pagado</CTableHeaderCell>
                <CTableHeaderCell>Saldo Restante</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="pago in pagos" :key="pago.id">
                <CTableDataCell>{{ pago.fecha }}</CTableDataCell>
                <CTableDataCell>
                  {{ pago.tratamiento ? pago.tratamiento.descripcion : 'N/A' }} /
                  <small>{{ (pago.tratamiento && pago.tratamiento.paciente) ? pago.tratamiento.paciente.nombre : 'N/A' }}</small>
                </CTableDataCell>
                <CTableDataCell>Bs.-{{ pago.total }}</CTableDataCell>
                <CTableDataCell class="text-success">Bs.{{ pago.adelanto }}</CTableDataCell>
                <CTableDataCell class="text-danger">Bs.{{ pago.saldo }}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" size="sm" @click="eliminarPago(pago.id)">Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>

    <!-- Modal Registrar Pago -->
    <CModal :visible="modalPago" @close="modalPago = false">
      <CModalHeader>
        <CModalTitle>Registrar Pago</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="guardarPago">
          <div class="mb-3">
            <CFormLabel>Tratamiento</CFormLabel>
            <CFormSelect
              v-model="formPago.tratamiento_id"
              required
            >
              <option :value="null">Seleccione un tratamiento...</option>
              <option v-for="t in tratamientos" :key="t.id" :value="t.id">
                {{ t.descripcion }} - {{ t.paciente ? t.paciente.nombre : 'Sin Paciente' }} (Costo: Bs.{{ t.costo }})
              </option>
            </CFormSelect>
          </div>
          <div class="mb-3">
            <CFormInput type="date" v-model="formPago.fecha" label="Fecha de Pago" required />
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <CFormInput type="number" step="0.01" v-model="formPago.total" label="Costo Total" readonly />
            </div>
            <div class="col-md-6 mb-3">
              <CFormInput type="number" step="0.01" v-model="formPago.saldo_pendiente" label="Saldo Pendiente" readonly />
            </div>
          </div>
          <div class="mb-3">
            <CFormInput type="number" step="0.01" v-model="formPago.adelanto" label="Monto a Pagar (Adelanto)" required />
          </div>
          <div class="mb-3">
            <CFormInput type="number" step="0.01" v-model="formPago.saldo" label="Nuevo Saldo Restante" readonly />
          </div>
          <div class="text-end">
            <CButton color="secondary" class="me-2" @click="modalPago = false">Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar Pago</CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      pagos: [],
      tratamientos: [],
      modalPago: false,
      formPago: {
        id: null,
        tratamiento_id: null,
        fecha: new Date().toISOString().substr(0, 10),
        total: 0,
        saldo_pendiente: 0,
        adelanto: 0,
        saldo: 0
      }
    }
  },
  mounted() {
    this.cargarPagos()
    this.cargarTratamientos()
  },
  watch: {
    'formPago.tratamiento_id'(newId) {
      this.handleTratamientoUpdate(newId)
    },
    'formPago.adelanto'(newVal) {
      this.calcularSaldo(newVal)
    }
  },
  methods: {
    cargarPagos() {
      axios.get('/pagos')
        .then(res => { this.pagos = res.data })
    },
    cargarTratamientos() {
      axios.get('/tratamientos')
        .then(res => { this.tratamientos = res.data })
    },
    nuevoPago() {
      this.formPago = {
        id: null,
        tratamiento_id: null,
        fecha: new Date().toISOString().substr(0, 10),
        total: 0,
        saldo_pendiente: 0,
        adelanto: 0,
        saldo: 0
      }
      this.modalPago = true
    },
    handleTratamientoUpdate(selectedId) {
      if (!selectedId) {
        this.formPago.total = 0
        this.formPago.saldo_pendiente = 0
        this.formPago.adelanto = 0
        this.formPago.saldo = 0
        return
      }

      const t = this.tratamientos.find(item => String(item.id) === String(selectedId))
      
      if (t) {
        const costoTotal = parseFloat(t.costo) || 0
        const pagado = t.pagos ? t.pagos.reduce((acc, p) => acc + parseFloat(p.adelanto), 0) : 0
        
        this.formPago.total = costoTotal
        this.formPago.saldo_pendiente = parseFloat((costoTotal - pagado).toFixed(2))
        this.formPago.adelanto = 0
        this.formPago.saldo = this.formPago.saldo_pendiente
      }
    },
    calcularSaldo(valorAdelanto) {
      const saldoPendiente = parseFloat(this.formPago.saldo_pendiente) || 0
      const adelanto = parseFloat(valorAdelanto) || 0
      
      // Cálculo directo y preciso
      const nuevoSaldo = saldoPendiente - adelanto
      this.formPago.saldo = parseFloat(nuevoSaldo.toFixed(2))
    },
    guardarPago() {
      axios.post('/pagos', this.formPago)
        .then(() => {
          this.cargarPagos()
          this.modalPago = false
          Swal.fire('Éxito', 'Pago registrado correctamente', 'success')
        })
    },
    eliminarPago(id) {
      Swal.fire({
        title: '¿Eliminar registro de pago?',
        icon: 'warning',
        showCancelButton: true
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`/pagos/${id}`).then(() => {
            this.cargarPagos()
            Swal.fire('Eliminado', '', 'success')
          })
        }
      })
    }
  }
}
</script>

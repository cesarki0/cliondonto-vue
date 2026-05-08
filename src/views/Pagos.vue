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
                <CTableDataCell>${{ pago.total }}</CTableDataCell>
                <CTableDataCell class="text-success">${{ pago.adelanto }}</CTableDataCell>
                <CTableDataCell class="text-danger">${{ pago.saldo }}</CTableDataCell>
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
            
            v-model="formPago.tratamiento_id" @change="onTratamientoChange" required>
              <option value="">Seleccione un tratamiento...</option>
              <option v-for="t in tratamientos" :key="t.id" :value="t.id">
                {{ t.descripcion }} - {{ t.paciente ? t.paciente.nombre : '' }} (Total: ${{ t.costo }})
              </option>
            </CFormSelect>
          </div>
          <div class="mb-3">
            <CFormInput type="date" v-model="formPago.fecha" label="Fecha de Pago" required />
          </div>
          <div class="mb-3">
            <CFormInput type="number" step="0.01" v-model="formPago.total" label="Costo Total del Tratamiento" readonly />
          </div>
          <div class="mb-3">
            <CFormInput type="number" step="0.01" v-model="formPago.adelanto" label="Monto a Pagar" @input="calcularSaldo" required />
          </div>
          <div class="mb-3">
            <CFormInput type="number" step="0.01" v-model="formPago.saldo" label="Saldo Restante" readonly />
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
        tratamiento_id: '',
        fecha: new Date().toISOString().substr(0, 10),
        total: 0,
        adelanto: 0,
        saldo: 0
      }
    }
  },
  mounted() {
    this.cargarPagos()
    this.cargarTratamientos()
  },
  methods: {
    cargarPagos() {
      axios.get('http://localhost:8000/api/pagos')
        .then(res => { this.pagos = res.data })
    },
    cargarTratamientos() {
      axios.get('http://localhost:8000/api/tratamientos')
        .then(res => { this.tratamientos = res.data })
    },
    nuevoPago() {
      this.formPago = {
        id: null,
        tratamiento_id: '',
        fecha: new Date().toISOString().substr(0, 10),
        total: 0,
        adelanto: 0,
        saldo: 0
      }
      this.modalPago = true
    },
    onTratamientoChange() {
      const t = this.tratamientos.find(item => item.id == this.formPago.tratamiento_id)
      if (t) {
        this.formPago.total = t.costo
        this.calcularSaldo()
      }
    },
    calcularSaldo() {
      this.formPago.saldo = this.formPago.total - this.formPago.adelanto
    },
    guardarPago() {
      axios.post('http://localhost:8000/api/pagos', this.formPago)
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
          axios.delete(`http://localhost:8000/api/pagos/${id}`).then(() => {
            this.cargarPagos()
            Swal.fire('Eliminado', '', 'success')
          })
        }
      })
    }
  }
}
</script>

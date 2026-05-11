<template>
  <div class="row w-100">
    <div class="col-12">
      <CCard class="shadow-sm">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Tratamientos Realizados</strong>
          <CButton color="primary" size="sm" @click="nuevoTratamiento">Registrar Tratamiento</CButton>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" responsive hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Paciente</CTableHeaderCell>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell>Pieza</CTableHeaderCell>
                <CTableHeaderCell>Costo</CTableHeaderCell>
                <CTableHeaderCell>Pagado</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="t in tratamientos" :key="t.id">
                <CTableDataCell>{{ t.paciente ? t.paciente.nombre : 'N/A' }}</CTableDataCell>
                <CTableDataCell>{{ t.descripcion }}</CTableDataCell>
                <CTableDataCell>{{ t.pieza || '-' }}</CTableDataCell>
                <CTableDataCell>Bs.-{{ t.costo }}</CTableDataCell>
                <CTableDataCell>
                    <CBadge :color="colorPago(t)">
                        Bs.-{{ totalPagado(t) }}
                    </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" @click="editarTratamiento(t)">Editar</CButton>
                  <CButton color="danger" size="sm" class="ms-2" @click="eliminarTratamiento(t.id)">Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>

    <!-- Modal Nuevo/Editar Tratamiento -->
    <CModal :visible="modalTratamiento" @close="modalTratamiento = false">
      <CModalHeader>
        <CModalTitle>{{ formTratamiento.id ? 'Editar' : 'Registrar' }} Tratamiento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="guardarTratamiento">
          <div class="mb-3">
            <CFormLabel>Paciente</CFormLabel>
            <CFormSelect v-model="formTratamiento.paciente_id" required>
              <option value="">Seleccione un paciente...</option>
              <option v-for="p in pacientes" :key="p.id" :value="p.id">{{ p.nombre }}</option>
            </CFormSelect>
          </div>
          <div class="mb-3">
            <CFormInput v-model="formTratamiento.descripcion" label="Descripción del tratamiento" required />
          </div>
          <div class="mb-3">
            <CFormInput v-model="formTratamiento.pieza" label="Pieza Dental (Nro)" placeholder="Opcional" />
          </div>
          <div class="mb-3">
            <CFormInput type="number" step="0.01" v-model="formTratamiento.costo" label="Costo Total" required />
          </div>
          <div class="text-end">
            <CButton color="secondary" class="me-2" @click="modalTratamiento = false">Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar</CButton>
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
      tratamientos: [],
      pacientes: [],
      modalTratamiento: false,
      formTratamiento: {
        id: null,
        paciente_id: '',
        descripcion: '',
        pieza: '',
        costo: 0
      }
    }
  },
  mounted() {
    this.cargarTratamientos()
    this.cargarPacientes()
  },
  methods: {
    cargarTratamientos() {
      axios.get('/tratamientos')
        .then(res => { this.tratamientos = res.data })
    },
    cargarPacientes() {
      axios.get('/pacientes')
        .then(res => { this.pacientes = res.data })
    },
    nuevoTratamiento() {
      this.formTratamiento = { id: null, paciente_id: '', descripcion: '', pieza: '', costo: 0 }
      this.modalTratamiento = true
    },
    editarTratamiento(t) {
      this.formTratamiento = { ...t }
      this.modalTratamiento = true
    },
    guardarTratamiento() {
      const url = this.formTratamiento.id 
        ? `/tratamientos/${this.formTratamiento.id}`
        : '/tratamientos'
      const method = this.formTratamiento.id ? 'put' : 'post'

      axios[method](url, this.formTratamiento)
        .then(() => {
          this.cargarTratamientos()
          this.modalTratamiento = false
          Swal.fire('Éxito', 'Tratamiento guardado', 'success')
        })
    },
    eliminarTratamiento(id) {
        Swal.fire({
            title: '¿Eliminar tratamiento?',
            icon: 'warning',
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`/tratamientos/${id}`).then(() => {
                    this.cargarTratamientos()
                    Swal.fire('Eliminado', '', 'success')
                })
            }
        })
    },
    totalPagado(t) {
        if (!t.pagos) return 0
        return t.pagos.reduce((acc, p) => acc + parseFloat(p.adelanto), 0)
    },
    colorPago(t) {
        const pagado = this.totalPagado(t)
        if (pagado >= t.costo) return 'success'
        if (pagado > 0) return 'warning'
        return 'danger'
    }
  }
}
</script>

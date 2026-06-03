<template>
<<<<<<< HEAD
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong><CIcon :icon="cilMedicalCross" class="me-2" />Tratamientos Realizados</strong>
          <CButton color="primary" size="sm" @click="nuevoTratamiento">
            <CIcon :icon="cilPlus" class="me-1" /> Registrar Tratamiento
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" responsive hover borderless>
=======
  <div class="row w-100">
    <div class="col-12">
      <CCard class="shadow-sm">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Tratamientos Realizados</strong>
          <CButton color="primary" size="sm" @click="nuevoTratamiento">Registrar Tratamiento</CButton>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" responsive hover>
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Paciente</CTableHeaderCell>
                <CTableHeaderCell>Descripción</CTableHeaderCell>
                <CTableHeaderCell>Pieza</CTableHeaderCell>
                <CTableHeaderCell>Costo</CTableHeaderCell>
                <CTableHeaderCell>Pagado</CTableHeaderCell>
<<<<<<< HEAD
                <CTableHeaderCell class="text-center">Acciones</CTableHeaderCell>
=======
                <CTableHeaderCell>Acciones</CTableHeaderCell>
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="t in tratamientos" :key="t.id">
                <CTableDataCell>{{ t.paciente ? t.paciente.nombre : 'N/A' }}</CTableDataCell>
                <CTableDataCell>{{ t.descripcion }}</CTableDataCell>
<<<<<<< HEAD
                <CTableDataCell>
                  <CBadge color="secondary" shape="pill">{{ t.pieza || '-' }}</CBadge>
                </CTableDataCell>
                <CTableDataCell class="fw-semibold text-primary">Bs.{{ t.costo }}</CTableDataCell>
                <CTableDataCell>
                    <CBadge :color="colorPago(t)" shape="pill">
                        Bs.{{ totalPagado(t) }}
                    </CBadge>
                </CTableDataCell>
                <CTableDataCell class="text-center">
                  <CButtonGroup>
                    <CButton color="info" size="sm" @click="editarTratamiento(t)" title="Editar">
                      <CIcon :icon="cilPencil" />
                    </CButton>
                    <CButton color="danger" size="sm" @click="eliminarTratamiento(t.id)" title="Eliminar">
                      <CIcon :icon="cilTrash" />
                    </CButton>
                  </CButtonGroup>
=======
                <CTableDataCell>{{ t.pieza || '-' }}</CTableDataCell>
                <CTableDataCell>Bs.{{ t.costo }}</CTableDataCell>
                <CTableDataCell>
                    <CBadge :color="colorPago(t)">
                        Bs.{{ totalPagado(t) }}
                    </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" @click="editarTratamiento(t)">Editar</CButton>
                  <CButton color="danger" size="sm" class="ms-2" @click="eliminarTratamiento(t.id)">Eliminar</CButton>
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
<<<<<<< HEAD
    </CCol>
=======
    </div>
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35

    <!-- Modal Nuevo/Editar Tratamiento -->
    <CModal :visible="modalTratamiento" @close="modalTratamiento = false">
      <CModalHeader>
        <CModalTitle>{{ formTratamiento.id ? 'Editar' : 'Registrar' }} Tratamiento</CModalTitle>
      </CModalHeader>
      <CModalBody>
<<<<<<< HEAD
        <CForm @submit.prevent="guardarTratamiento" class="row g-3">
          <CCol :md="12">
=======
        <CForm @submit.prevent="guardarTratamiento">
          <div class="mb-3">
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
            <CFormLabel>Paciente</CFormLabel>
            <CFormSelect v-model="formTratamiento.paciente_id" required>
              <option value="">Seleccione un paciente...</option>
              <option v-for="p in pacientes" :key="p.id" :value="p.id">{{ p.nombre }}</option>
            </CFormSelect>
<<<<<<< HEAD
          </CCol>
          <CCol :md="12">
            <CFormInput v-model="formTratamiento.descripcion" label="Descripción del tratamiento" placeholder="Ej: Curación con resina" required />
          </CCol>
          <CCol :md="6">
            <CFormInput v-model="formTratamiento.pieza" label="Pieza Dental (Nro)" placeholder="Opcional" />
          </CCol>
          <CCol :md="6">
            <CFormInput type="number" step="0.01" v-model="formTratamiento.costo" label="Costo Total (Bs.)" required />
          </CCol>
          <div class="mt-4 text-end">
            <CButton color="secondary" class="me-2" @click="modalTratamiento = false">Cancelar</CButton>
            <CButton color="primary" type="submit">Guardar Cambios</CButton>
=======
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
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
          </div>
        </CForm>
      </CModalBody>
    </CModal>
<<<<<<< HEAD
  </CRow>
=======
  </div>
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
<<<<<<< HEAD
import { cilMedicalCross, cilPlus, cilPencil, cilTrash } from '@coreui/icons'

export default {
  setup() {
    return {
      cilMedicalCross, cilPlus, cilPencil, cilTrash
    }
  },
=======

export default {
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
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
<<<<<<< HEAD
          Swal.fire({
            title: '¡Éxito!',
            text: 'Tratamiento guardado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          })
=======
          Swal.fire('Éxito', 'Tratamiento guardado', 'success')
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
        })
    },
    eliminarTratamiento(id) {
        Swal.fire({
            title: '¿Eliminar tratamiento?',
<<<<<<< HEAD
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
=======
            icon: 'warning',
            showCancelButton: true
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`/tratamientos/${id}`).then(() => {
                    this.cargarTratamientos()
<<<<<<< HEAD
                    Swal.fire('Eliminado', 'El tratamiento ha sido eliminado', 'success')
=======
                    Swal.fire('Eliminado', '', 'success')
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35
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
<<<<<<< HEAD

=======
>>>>>>> b35155d9e18d901e647d190257b0c6b01de5cc35

<template>
  <div class="row w-100">
    <div class="col-12">
      <CCard class="shadow-sm">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Pacientes</strong>
          <div>
            <CFormInput v-model="busqueda" placeholder="Buscar..." size="sm" class="me-2 d-inline-block" style="width:200px;" />
            <CButton color="primary" size="sm" @click.prevent="newPaciente">Nuevo Paciente</CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <CTable align="middle" responsive hover>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Nombre</CTableHeaderCell>
                <CTableHeaderCell>Celular</CTableHeaderCell>
                <CTableHeaderCell>Fecha Nacimiento</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="paciente in pacientesFiltrados" :key="paciente.id">
                <CTableDataCell>{{ paciente.id }}</CTableDataCell>
                <CTableDataCell>{{ paciente.nombre }}</CTableDataCell>
                <CTableDataCell>{{ paciente.celular }}</CTableDataCell>
                <CTableDataCell>{{ paciente.fecha_nacimiento }}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" size="sm" @click="verPaciente(paciente)" title="Ver Detalle">Detalle</CButton>
                  <CButton color="warning" size="sm" class="ms-1" @click="editarPaciente(paciente)" title="Editar">Editar</CButton>
                  <CButton color="dark" size="sm" class="ms-1" @click="$router.push('/odontogramas')" title="Odontograma">Odon.</CButton>
                  <CButton color="success" size="sm" class="ms-1" @click="$router.push('/citas')" title="Citas">Citas</CButton>
                  <CButton color="danger" size="sm" class="ms-1" @click="eliminarPaciente(paciente.id)" title="Eliminar">Eliminar</CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>

    <!-- Modal Nuevo/Editar -->
    <CModal :visible="modalNuevo" @close="modalNuevo=false">
      <CModalHeader>
        <CModalTitle class="w-100 text-center">{{ nuevo.id ? 'Actualizar' : 'Registrar' }} Paciente</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm class="row g-3" @submit.prevent="guardarPaciente">
          <div class="row">
            <div class="col-md-6">
              <CFormInput v-model="nuevo.nombre" label="Nombre" placeholder="Ingrese nombre..." required />
              <CFormInput v-model="nuevo.celular" label="Celular" />
              <CFormInput v-model="nuevo.fecha_nacimiento" type="date" label="Fecha Nacimiento" />
              <CFormInput v-model="nuevo.direccion" label="Dirección" placeholder="Dirección..." />
            </div>
            <div class="col-md-6">
              
              <h6 class="text-success">Antecedentes Médicos</h6>
              <CFormCheck label="Tratamiento Médico" v-model="nuevo.tratamiento_medico" />
              <CFormCheck label="Paciente Cardiaco" v-model="nuevo.paciente_cardiaco" />
              <CFormCheck label="Antecedentes Familiares" v-model="nuevo.antecedentes_familiares" />
              <CFormCheck label="Medicacion Previa" v-model="nuevo.medicacion" />
              <CFormCheck label="Hemorragia" v-model="nuevo.hemorragia" />
              <CFormCheck label="Intervención Quirúrgica" v-model="nuevo.intervencion_quirurgica" />
              <CFormCheck label="Alergias" v-model="nuevo.alergias" />
              <CFormCheck label="Diabetes" v-model="nuevo.diabetes" />
              <CFormCheck label="Intolerancias" v-model="nuevo.intolerancias" />
              <CFormCheck label="Gestante" v-model="nuevo.gestante" />
              <CFormSelect v-model="nuevo.presion_arterial" label="Presión Arterial" :options="['alta','normal','baja']" />
              <CFormTextarea v-model="nuevo.habitos" label="Hábitos" placeholder="Ej: fuma, bebe, etc." />
            </div>
          </div>
          <div class="mt-3 text-end">
            <CButton color="primary" type="submit">Guardar Paciente</CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>

    <!-- Modal Ver -->
    <CModal :visible="modalVer" @close="modalVer=false" size="lg">
      <CModalHeader>
        <CModalTitle class="w-100 text-center">Detalle del Paciente</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="row" v-if="pacienteSeleccionado">
          <div class="col-md-6">
            <p><strong>Nombre:</strong> {{ pacienteSeleccionado.nombre }}</p>
            <p><strong>Celular:</strong> {{ pacienteSeleccionado.celular }}</p>
            <p><strong>Fecha Nacimiento:</strong> {{ pacienteSeleccionado.fecha_nacimiento }}</p>
            <p><strong>Dirección:</strong> {{ pacienteSeleccionado.direccion }}</p>
          </div>
          <div class="col-md-6">
            <h6 class="text-success">Antecedentes Médicos</h6>
            <ul>
              <li v-if="pacienteSeleccionado.tratamiento_medico">Tratamiento Médico</li>
              <li v-if="pacienteSeleccionado.paciente_cardiaco">Paciente Cardíaco</li>
              <li v-if="pacienteSeleccionado.antecedentes_familiares">Antecedentes Familiares</li>
              <li v-if="pacienteSeleccionado.medicacion">Medicaciones Previas</li>
              <li v-if="pacienteSeleccionado.hemorragia">Hemorragia</li>
              <li v-if="pacienteSeleccionado.intervencion_quirurgica">Intervención Quirúrgica</li>
              <li v-if="pacienteSeleccionado.alergias">Alergias</li>
              <li v-if="pacienteSeleccionado.diabetes">Diabetes</li>
              <li v-if="pacienteSeleccionado.intolerancias">Intolerancias</li>
              <li v-if="pacienteSeleccionado.gestante">Gestante</li>
              <li v-if="pacienteSeleccionado.presion_arterial">Presión Arterial: {{ pacienteSeleccionado.presion_arterial }}</li>
              <li v-if="pacienteSeleccionado.habitos">Hábitos: {{ pacienteSeleccionado.habitos }}</li>
            </ul>
          </div>
        </div>
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
      pacientes: [],
      busqueda: '',
      modalNuevo: false,
      modalVer: false,
      pacienteSeleccionado: {},
      nuevo: {
        id: null,
        nombre: '',
        celular: '',
        direccion: '',
        fecha_nacimiento: '',
        tratamiento_medico: false,
        paciente_cardiaco: false,
        antecedentes_familiares: false,
        medicacion: false,
        hemorragia: false,
        intervencion_quirurgica: false,
        alergias: false,
        diabetes: false,
        intolerancias: false,
        gestante: false,
        presion_arterial: 'normal',
        habitos: '',
      }
    }
  },
  computed: {
    pacientesFiltrados() {
      return this.pacientes.filter(p =>
        p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      )
    }
  },
  mounted() {
    console.log("API URL:", import.meta.env.VITE_API_URL)
    this.cargarPacientes()
  },
  methods: {
    resetNuevo() {
      this.nuevo = {
        id: null,
        nombre: '',
        celular: '',
        direccion: '',
        fecha_nacimiento: '',
        tratamiento_medico: false,
        paciente_cardiaco: false,
        antecedentes_familiares: false,
        medicacion: false,
        hemorragia: false,
        intervencion_quirurgica: false,
        alergias: false,
        diabetes: false,
        intolerancias: false,
        gestante: false,
        presion_arterial: 'normal',
        habitos: '',
      }
    },
    newPaciente() {
      this.resetNuevo()
      this.modalNuevo = true
    },
    verPaciente(paciente) {
      this.pacienteSeleccionado = { ...paciente }
      this.modalVer = true
    },
    editarPaciente(paciente) {
      this.nuevo = {
        ...paciente,
        tratamiento_medico: !!paciente.tratamiento_medico,
        paciente_cardiaco: !!paciente.paciente_cardiaco,
        antecedentes_familiares: !!paciente.antecedentes_familiares,
        medicacion: !!paciente.medicacion,
        hemorragia: !!paciente.hemorragia,
        intervencion_quirurgica: !!paciente.intervencion_quirurgica,
        alergias: !!paciente.alergias,
        diabetes: !!paciente.diabetes,
        intolerancias: !!paciente.intolerancias,
        gestante: !!paciente.gestante,
      }
      this.modalNuevo = true
    },
    cargarPacientes() {
      const baseURL = import.meta.env.VITE_API_URL
      //axios.get('http://localhost:8000/api/pacientes')
      axios.get(`${baseURL}/pacientes`)
        .then(res => { this.pacientes = res.data })
        .catch(err => console.error("Error cargando pacientes:", err))
    },
    guardarPaciente() {
    //  const url = this.nuevo.id 
    //    ? `http://localhost:8000/api/pacientes/${this.nuevo.id}`
    //    : 'http://localhost:8000/api/pacientes'
      
    const baseURL = import.meta.env.VITE_API_URL
    const url = this.nuevo.id
      ? `${baseURL}/pacientes/${this.nuevo.id}`
      : `${baseURL}/pacientes`
        const method = this.nuevo.id ? 'put' : 'post'

      axios[method](url, this.nuevo)
        .then(() => {
          this.cargarPacientes()
          this.modalNuevo = false
          Swal.fire({
            title: '¡Éxito!',
            text: `El paciente fue ${this.nuevo.id ? 'actualizado' : 'registrado'} correctamente.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          })
          this.resetNuevo()
        })
        .catch((error) => {
          console.error(error)
          Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar el paciente.',
            icon: 'error'
          })
        })
    },
    eliminarPaciente(id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:8000/api/pacientes/${id}`)
            .then(() => {
              this.cargarPacientes()
              Swal.fire('Eliminado', 'El paciente fue eliminado.', 'success')
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el paciente.', 'error')
            })
        }
      })
    }
  }
}
</script>

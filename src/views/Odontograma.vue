<template>
  <div class="row w-100">
    <div class="col-12">
      <CCard class="shadow-sm">
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Odontograma Visual</strong>
          <div style="width: 300px;">
            <CFormSelect v-model="pacienteId" @change="cargarOdontograma" size="sm">
              <option value="">Seleccione un paciente...</option>
              <option v-for="p in pacientes" :key="p.id" :value="p.id">{{ p.nombre }}</option>
            </CFormSelect>
          </div>
        </CCardHeader>
        <CCardBody>
          <div v-if="!pacienteId" class="text-center py-5">
            <h5 class="text-muted">Seleccione un paciente para ver su odontograma</h5>
          </div>
          
          <div v-else>
            <div class="row text-center mb-4">
              <div class="col-12 mb-3"><h6 class="text-primary">Superior</h6></div>
              <div class="col-12 d-flex justify-content-center flex-wrap">
                <div v-for="n in superior" :key="n" class="tooth-box" :class="statusColor(n)" @click="editTooth(n)">
                  <div class="tooth-num">{{ n }}</div>
                  <div class="tooth-status">{{ toothStatus(n) }}</div>
                </div>
              </div>
            </div>

            <hr>

            <div class="row text-center mt-4">
              <div class="col-12 mb-3"><h6 class="text-primary">Inferior</h6></div>
              <div class="col-12 d-flex justify-content-center flex-wrap">
                <div v-for="n in inferior" :key="n" class="tooth-box" :class="statusColor(n)" @click="editTooth(n)">
                  <div class="tooth-num">{{ n }}</div>
                  <div class="tooth-status">{{ toothStatus(n) }}</div>
                </div>
              </div>
            </div>

            <div class="mt-4">
                <h6>Leyenda:</h6>
                <div class="d-flex gap-3">
                    <span><CBadge color="success">Sano</CBadge></span>
                    <span><CBadge color="danger">Caries</CBadge></span>
                    <span><CBadge color="primary">Restaurado</CBadge></span>
                    <span><CBadge color="secondary">Extraido</CBadge></span>
                    <span><CBadge color="warning">Tratamiento</CBadge></span>
                </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>

    <!-- Modal Editar Diente -->
    <CModal :visible="modalTooth" @close="modalTooth = false">
      <CModalHeader>
        <CModalTitle>Pieza Dental {{ selectedTooth }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="saveTooth">
          <div class="mb-3">
            <CFormLabel>Estado</CFormLabel>
            <CFormSelect v-model="toothForm.estado">
              <option value="sano">Sano</option>
              <option value="caries">Caries</option>
              <option value="restaurado">Restaurado</option>
              <option value="extraido">Extraído</option>
              <option value="tratamiento">En tratamiento</option>
            </CFormSelect>
          </div>
          <div class="mb-3">
            <CFormTextarea v-model="toothForm.observaciones" label="Observaciones" rows="3"></CFormTextarea>
          </div>
          <div class="text-end">
             <CButton color="primary" type="submit">Guardar Cambios</CButton>
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
      pacientes: [],
      pacienteId: '',
      odontograma: [],
      superior: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
      inferior: [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
      modalTooth: false,
      selectedTooth: null,
      toothForm: {
        estado: 'sano',
        observaciones: ''
      }
    }
  },
  mounted() {
    this.cargarPacientes()
  },
  methods: {
    cargarPacientes() {
      axios.get('http://localhost:8000/api/pacientes').then(res => { this.pacientes = res.data })
    },
    cargarOdontograma() {
      if (!this.pacienteId) {
        this.odontograma = []
        return
      }
      axios.get('http://localhost:8000/api/odontogramas').then(res => {
        // En un sistema real filtraríamos por paciente_id en el backend
        this.odontograma = res.data.filter(o => o.paciente_id == this.pacienteId)
      })
    },
    toothStatus(n) {
      const t = this.odontograma.find(o => o.pieza == n)
      return t ? t.estado : 'sano'
    },
    statusColor(n) {
      const s = this.toothStatus(n)
      if (s === 'caries') return 'bg-danger text-white'
      if (s === 'restaurado') return 'bg-primary text-white'
      if (s === 'extraido') return 'bg-secondary text-white'
      if (s === 'tratamiento') return 'bg-warning text-dark'
      return 'bg-success text-white'
    },
    editTooth(n) {
      this.selectedTooth = n
      const t = this.odontograma.find(o => o.pieza == n)
      if (t) {
        this.toothForm = { ...t }
      } else {
        this.toothForm = { estado: 'sano', observaciones: '' }
      }
      this.modalTooth = true
    },
    saveTooth() {
        const data = {
            ...this.toothForm,
            paciente_id: this.pacienteId,
            pieza: this.selectedTooth
        }

        const existing = this.odontograma.find(o => o.pieza == this.selectedTooth)
        const url = existing ? `http://localhost:8000/api/odontogramas/${existing.id}` : 'http://localhost:8000/api/odontogramas'
        const method = existing ? 'put' : 'post'

        axios[method](url, data).then(() => {
            this.cargarOdontograma()
            this.modalTooth = false
            Swal.fire('Guardado', `Diente ${this.selectedTooth} actualizado`, 'success')
        })
    }
  }
}
</script>

<style scoped>
.tooth-box {
  width: 70px;
  height: 70px;
  border: 1px solid #ccc;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s;
}
.tooth-box:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.tooth-num {
  font-weight: bold;
  font-size: 1.2rem;
}
.tooth-status {
  font-size: 0.7rem;
  text-transform: uppercase;
}
</style>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 350px;">
      <div style="text-align:center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2);">
        <img src="/logo_karen.jpg" alt="Logo" style="max-height: 60px;" />
      </div>
        
      <form @submit.prevent="login">
        <div class="mb-3">
          <label>Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Contraseña</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const email = ref('')
const password = ref('')

const login = () => {
  axios.post('/login', { email: email.value, password: password.value })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        Swal.fire('Bienvenido', 'Login correcto', 'success')
        window.location.href = '/pacientes'
      } else {
        Swal.fire('Error', res.data.message, 'error')
      }
    })
    .catch(() => {
      Swal.fire('Error', 'No se pudo iniciar sesión', 'error')
    })
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { cilMenu } from '@coreui/icons'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const sidebarVisible = ref(true) // Cerrado por defecto en móvil es mejor, pero el usuario dijo que "desaparece", así que quizás lo quiere ver.
// Sin embargo, CoreUI lo manejará según el breakpoint si no forzamos visible.



const route = useRoute()
const router = useRouter()

// Detectar tamaño de pantalla al cargar
onMounted(() => {
  if (window.innerWidth < 768) {
    sidebarVisible.value = false // 👈 oculto en móviles
  }
})

// Función de logout
const logout = async () => {
  try {
    // Llamada al backend (opcional si tienes endpoint /logout)
    await axios.post('/logout')

  } catch (err) {
    console.error('Error cerrando sesión:', err)
  } finally {
    // Limpia el token y redirige al login
    localStorage.removeItem('token')
    router.push('/login')
  }
}


</script>

<template>
  <div style="display: flex; min-height: 100vh; margin: 0; padding: 0; overflow-x: hidden;">
    
        <!-- Mostrar sidebar solo si NO estamos en login -->
    <CSidebar 
      v-if="route.path !== '/login'"
      class="sidebar-custom border-end" 
      :visible="sidebarVisible"
      @visible-change="(val) => { sidebarVisible = val }"
    >

      <!-- Logo arriba -->
      <div style="text-align:center; padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2);">
        <img src="/logo_karen.jpg" alt="Logo" style="max-height: 60px;" />
      </div>
      
      <CSidebarNav>

        <CNavItem>
          <router-link to="/dashboard" class="nav-link custom-nav-link">
             Dashboard
          </router-link>
        </CNavItem>

        <CNavItem>
          <router-link to="/pacientes" class="nav-link custom-nav-link">
             Pacientes
          </router-link>
        </CNavItem>
        <CNavItem>
          <router-link to="/citas" class="nav-link custom-nav-link">
             Citas
          </router-link>
        </CNavItem>
        <CNavItem>
          <router-link to="/tratamientos" class="nav-link custom-nav-link">
             Tratamientos
          </router-link>
        </CNavItem>
        <CNavItem>
          <router-link to="/pagos" class="nav-link custom-nav-link">
             Pagos
          </router-link>
        </CNavItem>
        <CNavItem>
          <router-link to="/odontogramas" class="nav-link custom-nav-link">
             Odontogramas
          </router-link>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>

    <div style="flex-grow: 1; background-color: #f8f9fa; display: flex; flex-direction: column; min-width: 0;">
      
      <!-- Header solo si NO estamos en login -->
      <header 
       v-if="route.path !== '/login'"
       style="width: 100%; background: white; padding: 1rem; border-bottom: 1px solid #ddd; display: flex; align-items: center;">
        <CHeaderToggler 
          class="ps-1" 
          @click="sidebarVisible = !sidebarVisible"
          style="margin-right: 1rem;"
        >
          <CIcon :icon="cilMenu" size="lg" />
        </CHeaderToggler>
        <h4 style="margin: 0;">Sistema Dental</h4>
         <!-- 👇 Esto empuja el botón al final -->
        <div style="margin-left: auto;">
          <CButton color="dark" @click="logout">Cerrar Sesión</CButton>
        </div>
      </header>

      <main style="padding: 20px; width: 100%;">
        <router-view />
      </main>

    </div>
  </div>
</template>

<style>
/* CSS Global para matar márgenes rebeldes del navegador */
body, html {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
}

.sidebar-custom {
  background-color: #20164e !important; /* Morado oscuro suave/vibrante (CoreUI Primary) */
  color: white !important;
}

.custom-nav-link {
  color: rgba(255, 255, 255, 0.85) !important;
  transition: all 0.2s ease;
  padding: 10px 20px;
}

.custom-nav-link:hover {
  color: white !important;
  background-color: rgba(0, 0, 0, 0.15) !important; /* Oscurece un poco al pasar el cursor */
}

/* Eliminamos .router-link-active para que no se quede marcado permanentemente */
</style>


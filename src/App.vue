<script setup>
import { ref } from 'vue'
import { cilMenu } from '@coreui/icons'

const sidebarVisible = ref(false) // Cerrado por defecto en móvil es mejor, pero el usuario dijo que "desaparece", así que quizás lo quiere ver.
// Sin embargo, CoreUI lo manejará según el breakpoint si no forzamos visible.
</script>

<template>
  <div style="display: flex; min-height: 100vh; margin: 0; padding: 0; overflow-x: hidden;">
    
    <CSidebar 
      class="sidebar-custom border-end" 
      :visible="sidebarVisible"
      @visible-change="(val) => { sidebarVisible = val }"
    >
      <CSidebarNav>
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
      
      <header style="width: 100%; background: white; padding: 1rem; border-bottom: 1px solid #ddd; display: flex; align-items: center;">
        <CHeaderToggler 
          class="ps-1" 
          @click="sidebarVisible = !sidebarVisible"
          style="margin-right: 1rem;"
        >
          <CIcon :icon="cilMenu" size="lg" />
        </CHeaderToggler>
        <h4 style="margin: 0;">Sistema Dental</h4>
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
  background-color: #5856d6 !important; /* Morado oscuro suave/vibrante (CoreUI Primary) */
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


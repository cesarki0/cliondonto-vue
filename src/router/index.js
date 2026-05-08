import { createRouter, createWebHistory } from 'vue-router'

import Pacientes from '../views/Pacientes.vue'
import Citas from '../views/Citas.vue'
import Tratamientos from '../views/Tratamientos.vue'
import Pagos from '../views/Pagos.vue'
import Odontograma from '../views/Odontograma.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/pacientes' },
    { path: '/pacientes', name: 'pacientes', component: Pacientes },
    { path: '/citas', name: 'citas', component: Citas },
    { path: '/tratamientos', name: 'tratamientos', component: Tratamientos },
    { path: '/pagos', name: 'pagos', component: Pagos },
    { path: '/odontogramas', name: 'odontogramas', component: Odontograma },
  ],
})

export default router

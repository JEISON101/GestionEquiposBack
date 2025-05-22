/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import PresidenteController from '../app/controller/PresidenteController.js'
import EquiposController from '../app/controller/EquipoController.js'

//instacia de la clase PresidenteController
const presidenteController = new PresidenteController

//rutas de presidente
router.get('/presidentes', presidenteController.getPresidentes)
router.post('/presidente', presidenteController.postPresidente)
router.put('/presidente/:id', presidenteController.putPresidente)
router.delete('/presidente/:id', presidenteController.deletePresidente)

//instancia de la clase EquipoController
const equipoController = new EquiposController 
//rutas de equipo
router.get('/equipo',equipoController.getEquipo)
router.post('/equipo',equipoController.postEquipo)
router.put('/equipo/:id',equipoController.putEquipo)
router.delete('/equipo/:id',equipoController.deleteEquipo)
router.get('/equipos_disponibles',equipoController.getEquipoPresidente)


import router from '@adonisjs/core/services/router'
import PresidenteController from '../app/controller/PresidenteController.js'
import EquiposController from '../app/controller/EquipoController.js'
import { AuthUsuariosController } from '../app/controller/AuthUsuariosController.js'

//instacia de la clase PresidenteController
const presidenteController = new PresidenteController

//instancia de la clase AuthUsuariosController
const usuario = new AuthUsuariosController

//ruta de registro
router.post('/register', usuario.register)

//ruta de logueo
router.post('/login', usuario.login)

//rutas de presidente
router.get('/presidentes', presidenteController.getPresidentes)
router.post('/presidente', presidenteController.postPresidente)
router.put('/presidente/:dni', presidenteController.putPresidente)
router.delete('/presidente/:dni', presidenteController.deletePresidente)

//instancia de la clase EquipoController
const equipoController = new EquiposController 
//rutas de equipo
router.get('/equipo',equipoController.getEquipo)
router.post('/equipo',equipoController.postEquipo)
router.put('/equipo/:id',equipoController.putEquipo)
router.delete('/equipo/:id',equipoController.deleteEquipo)
router.get('/equipos_disponibles',equipoController.getEquipoPresidente)

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

//instacia de la clase PresidenteController
const presidenteController = new PresidenteController

//rutas de presidente
router.get('/presidentes', presidenteController.getPresidentes)
router.post('/presidente', presidenteController.postPresidente)
router.put('/presidente/:id', presidenteController.putPresidente)
router.delete('/presidente/:id', presidenteController.deletePresidente)

import { Router } from 'express'
import userController from '../controllers/user-controller.js'

const router = Router()

router.post('/registration', userController.registration)
router.post('/login')
router.post('/logout')
router.get('/activate/:link', userController.activate)
router.post('/refresh')
router.get('/users', userController.getAllUsers)

export { router }

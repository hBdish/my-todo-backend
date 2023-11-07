import { Router } from 'express'
import userController from '../controllers/user-controller.js'
import { body } from 'express-validator'

const router = Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration,
)
router.post('/login')
router.post('/logout')
router.get('/activate/:link', userController.activate)
router.post('/refresh')
router.get('/users', userController.getAllUsers)

export { router }

import express, { Router } from 'express'
import userController from '../controllers/user-controller.js'
import { body } from 'express-validator'
import { TokenModel } from '../models/token-model.js'

const router = Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.post('/refresh', userController.refresh)
router.get('/users', userController.getAllUsers)

export { router }

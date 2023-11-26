import { Router } from 'express'
import CompanyControllers from '../controllers/company-controllers.js'

const router = Router()

router.post('/company', CompanyControllers.createCompany)

export default router

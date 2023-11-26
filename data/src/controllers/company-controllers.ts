import express from 'express'

import { ErrorNext } from '../middlewares/types/error-middleware-types.js'
import CompanyService from '../service/company-service.js'

export interface CompanyRequest extends express.Request {
  body: {
    companyName: string
  }
}

class CompanyControllers {
  async createCompany(req: CompanyRequest, res: express.Response, next: ErrorNext) {
    try {
      const companyName = req.body.companyName
      const company = await CompanyService.createService(companyName)
      res.json(company)
    } catch (e) {
      next(e)
    }
  }
}

export default new CompanyControllers()

import Company from '../models/company-model.js'

class CompanyService {
  async createService(companyName: string) {
    return await Company.create({ companyName })
  }
}

export default new CompanyService()

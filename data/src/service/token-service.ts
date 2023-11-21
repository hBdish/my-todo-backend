import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/relationships-model.js'
import { UserDtoType } from '../dtos/user-dto.js'

class TokenService {
  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
      return userData
    } catch (e) {
      return null
    }
  }
}

export default new TokenService()

import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/relationships-model.js'
import { UserDtoType } from '../dtos/user-dto.js'

class TokenService {
  generateTokens(payload: UserDtoType) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      where: { UserId: userId },
    })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await TokenModel.create({
      UserId: userId,
      refreshToken,
    })

    return token
  }
}

export default new TokenService()

import { UserModel } from '../models/relationships-model.js'
import bcrypt from 'bcrypt'
import * as uuid from 'uuid'
import MailService from './mail-service.js'
import TokenService from './token-service.js'
import { UserDto } from '../dtos/user-dto.js'

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({
      where: {
        email,
      },
    })

    if (candidate) {
      throw new Error(`Пользователь с таким email уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await UserModel.create({ email, password: hashPassword, isActivated: false, activationLink })

    await MailService.sendActivationMail(email, activationLink)

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    await TokenService.saveToken(user.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

export default new UserService()

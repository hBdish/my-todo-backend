import express from 'express'
import { UserModel, UserSchema } from '../models/user-model.js'
import UserService from '../service/user-service.js'
import { UserDtoType } from '../dtos/user-dto.js'

export interface RegistrationRequest extends express.Request {
  body: {
    email: string
    password: string
  }
}

class UserController {
  async registration(
    req: RegistrationRequest,
    res: express.Response<{ user: UserDtoType; accessToken: string; refreshToken: string }>,
  ) {
    try {
      const { password, email } = req.body
      if (!password || !email) {
        throw new Error('Не введен email или пароль')
      }

      const userData = await UserService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      console.log(e)
    }
  }
  //
  // async login(req, res, next) {
  //   try {
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  //
  // async logout(req, res, next) {
  //   try {
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  //
  // async activate(req, res, next) {
  //   try {
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  //
  // async refresh(req: express.Request<string>, res: express.Response<string>) {
  //   try {
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  async getAllUsers(req: express.Request<string>, res: express.Response<UserSchema[]>) {
    try {
      const user = await UserModel.findAll()

      if (!user) return
      res.json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

export default new UserController()

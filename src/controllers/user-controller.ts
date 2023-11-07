import express from 'express'
import { UserModel, UserSchema } from '../models/user-model.js'
import UserService from '../service/user-service.js'
import { UserDtoType } from '../dtos/user-dto.js'
import { ApiError } from '../exceptions/api-error.js'
import { ActivateRequestParams, RegistrationRequest } from './types/user-controllers-types.js'

class UserController {
  async registration(
    req: RegistrationRequest,
    res: express.Response<{ user: UserDtoType; accessToken: string; refreshToken: string }>,
    next: (e: unknown) => void,
  ) {
    try {
      const { password, email } = req.body
      if (!password || !email) {
        throw ApiError.BadRequest('Не введен email или пароль')
      }

      const userData = await UserService.registration(email, password)

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (e) {
      next(e)
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
  async activate(req: express.Request<ActivateRequestParams>, res: express.Response<void>, next: (e: unknown) => void) {
    try {
      const activationLink = req.params.link
      await UserService.activate(activationLink)

      return res.redirect(`${process.env.CLIENT_URL}`)
    } catch (e) {
      next(e)
    }
  }

  // async refresh(req: express.Request<string>, res: express.Response<string>) {
  //   try {
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  async getAllUsers(req: express.Request, res: express.Response<UserSchema[]>, next: (e: unknown) => void) {
    try {
      const user = await UserModel.findAll()

      if (!user) return
      res.json(user)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()

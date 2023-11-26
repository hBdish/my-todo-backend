import { ApiError } from '../exceptions/api-error.js'
import tokenService from '../service/token-service.js'
import { NextFunction, Request } from 'express'
import { UserSchema } from '../../../auth/src/models/user-model.js' // TODO переделать

export default function (req: Request, res: unknown, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const accessToken = authorizationHeader.split(' ')[1]

    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = tokenService.validateAccessToken(accessToken) as UserSchema // TODO переделать
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.headers.user = JSON.stringify(userData)
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }
}

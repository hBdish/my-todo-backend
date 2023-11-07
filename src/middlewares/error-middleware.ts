import { ApiError } from '../exceptions/api-error.js'
import express from 'express'

export default function <Request extends express.Request, Response extends express.Response>(
  err: Error,
  req: Request,
  res: Response,
  next: (e: unknown) => void,
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    })
  }

  return res.status(500).json({
    message: 'Непредвиденная ошибка',
  })
}

import express from 'express'
import * as core from 'express-serve-static-core'

export interface RegistrationRequest extends express.Request {
  body: {
    email: string
    password: string
  }
}

export interface ActivateRequestParams extends core.ParamsDictionary {
  link: string
}

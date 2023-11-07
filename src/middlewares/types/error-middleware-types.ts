import { ValidationError } from 'sequelize'
import {
  AlternativeValidationError,
  FieldValidationError,
  GroupedAlternativeValidationError,
  UnknownFieldsError,
} from 'express-validator'

export type ErrorApi = (
  | Error
  | ValidationError
  | AlternativeValidationError
  | GroupedAlternativeValidationError
  | UnknownFieldsError
  | FieldValidationError
)[]

export type ErrorNext = (e: unknown, errors?: ErrorApi) => void

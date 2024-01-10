/* eslint-disable */
import type * as Types from '../../../../../@types'

export type Methods = {
  post: {
    status: 201
    /** Guess submitted successfully */
    resBody: Types.Guess
    /** User's guess for the riddle */
    reqBody: Types.GuessCreate
  }
}

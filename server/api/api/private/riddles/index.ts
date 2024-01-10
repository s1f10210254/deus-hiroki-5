/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  post: {
    status: 201
    /** Riddle created successfully */
    resBody: Types.Riddle
    /** Riddle to be created */
    reqBody: Types.RiddleCreate
  }
}

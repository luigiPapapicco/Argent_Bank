import { createAction } from '@reduxjs/toolkit'

export const setCredentials = createAction('auth/setCredentials')
export const logoutUser = createAction('auth/logoutUser')

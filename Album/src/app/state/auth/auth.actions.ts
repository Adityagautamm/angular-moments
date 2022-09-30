import { credentials } from '../../models/credentials';
import { createAction, props } from '@ngrx/store';
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';
export const ACCESS_TOKEN_REFRESH = '[auth page] access token refresh';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ credentialState: credentials; redirect: boolean }>()
);
export const accessTokenRefresh = createAction(
  ACCESS_TOKEN_REFRESH,
  props<{ token: string }>()
);

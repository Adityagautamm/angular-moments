import { Actions } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { accessTokenRefresh, loginSuccess } from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      credentialsState: action.credentialState,
    };
  }),
  on(accessTokenRefresh, (state, action) => {
    return {
      ...state,
      credentialsState: action,
    };
  })
);

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

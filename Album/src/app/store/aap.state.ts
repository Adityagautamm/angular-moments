import { AuthReducer } from '../state/auth/auth.reducer';
import { AUTH_STATE_NAME } from '../state/auth/auth.selector';
import { AuthState } from '../state/auth/auth.state';

export interface AppState {
  [AUTH_STATE_NAME]: AuthState;
}

export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
};

import { credentials } from '../../models/credentials';
export interface AuthState {
  credentialsState: credentials | null;
}

export const initialState: AuthState = {
  credentialsState: null,
};

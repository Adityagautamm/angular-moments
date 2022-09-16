import { createAction, props } from '@ngrx/store';

export const addAuth = createAction(
  '[Auth] Add Auth',
  props<{ credentials: { accessToken: string } }>()
);

export const removeAuth = createAction(
  '[Auth] Remove Auth',
  props<{ credentials: { accessToken: string } }>()
);

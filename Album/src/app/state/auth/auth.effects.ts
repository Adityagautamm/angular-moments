import { UserAuthService } from 'src/app/services/user-auth.service';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { loginStart, loginSuccess } from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { loginData } from 'src/app/models/registration';
import { credentials } from 'src/app/models/credentials';

@Injectable()
export class AuthEffects {
  loginData!: loginData;
  credential!: credentials;
  constructor(
    private actions$: Actions,
    private userAuthService: UserAuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.loginData = {
          email: action.email,
          password: action.password,
        };
        return this.userAuthService.authenticateUser(this.loginData).pipe(
          map((data) => {
            this.credential = { token: data.accessToken };
            return loginSuccess({
              credentialState: this.credential,
              redirect: true,
            });
          })
        );
      })
    );
  });
}

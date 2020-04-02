export interface IAuthState {
  csrfToken: string;
}

export interface IState {
  auth: IAuthState;
}

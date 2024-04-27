export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  flag: boolean;
  token: string;
  message: string;
}

export class RegisterModel {
  public name: string = "";
  public surname: string = "";
  public address: string = "";
  public username: string = "";
  public password: string = "";
}

export class UserModel {
  public userName: string = '';
  public name: string = '';
  public surname: string = '';
}
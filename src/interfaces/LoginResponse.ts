export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface ILoginResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    user: IUser;
  };
}

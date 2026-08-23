import { UserResponse } from 'src/users/types/user-response.type';

export interface LoginResponse {
  authToken: string;
  user: UserResponse;
}

import { auth } from '@repo/auth';
import { GetCurrentUserOutputType } from './model';

class AuthService {
  public async getCurrentUser(user: GetCurrentUserOutputType) {
    return user;
  }

  public async logout(headers: HeadersInit) {
    await auth.api.signOut({ headers });

    return {
      success: true,
    };
  }
}

export default AuthService;

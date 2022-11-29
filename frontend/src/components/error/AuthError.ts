class AuthError extends Error {
  constructor() {
    super('권한이 없습니다');
  }
}

export default AuthError;

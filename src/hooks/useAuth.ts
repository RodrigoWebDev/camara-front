/* eslint-disable @typescript-eslint/no-unused-vars */

export function isTokenValid(): boolean {
  return !!getUserFromToken();
}

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  const roleName = localStorage.getItem('roleName');
  if (!token) return null;

  try {
    const [, payloadB64] = token.split('.');
    const payload = JSON.parse(atob(payloadB64));

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      localStorage.removeItem('token');
      return null;
    }

    return {
      role: payload.role,
      roleName: roleName,
      isValid: true,
    };
  } catch (e) {
    localStorage.removeItem('token');
    return null;
  }
};

export const useAuth = () => {
  return getUserFromToken();
};

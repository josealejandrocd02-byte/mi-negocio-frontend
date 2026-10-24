import { login } from "@/services/AuthServices/authService";
import { clearSession, saveRole, saveToken, saveUser } from "@/utils/storage";

export const useAuth = () => {
  const handleLogin = async (email: string, password: string) => {
    const data = await login(email, password);

    saveToken(data.token);
    saveRole(data.platformRole);
    saveUser({
      userId: data.userId,
      email: data.email,
      fullName: data.fullName,
      platformRole: data.platformRole,
    });

    return data;
  };

  const handleLogout = () => {
    clearSession();
  };

  return { handleLogin, handleLogout };
};

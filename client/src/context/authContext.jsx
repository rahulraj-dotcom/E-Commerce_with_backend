import { createContext, useContext, useEffect, useState } from "react";
import api from "../apis/apis";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const refreshResponse = await api.post("/auth/refresh");

        const newAccessToken = refreshResponse.data.data.accessToken;

        setAccessToken(newAccessToken);

        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        setUser(response.data.data.user);
      } catch (error) {
        console.log("user is not looged in");
      }
    };
    getUser();
  }, []);

  const logoutHandler = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.log("logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

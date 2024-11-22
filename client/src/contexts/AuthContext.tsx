import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
    };

    return <AuthContext.Provider value={{ token, setToken, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

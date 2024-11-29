import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: string | null;
    setUser: (user: string | null) => void;
    isGuest: boolean;
    setIsGuest: (isGuest: boolean) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<string | null>(null);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsGuest(false);
        localStorage.removeItem("authToken");
    };

    const isLoggedIn = !!token;

    return <AuthContext.Provider value={{ token, user, setUser, setToken, isGuest, setIsGuest, logout, isLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

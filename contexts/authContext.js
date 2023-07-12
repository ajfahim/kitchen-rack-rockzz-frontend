import { verify } from '@/dataFetcher/user';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isVerified = async () => {
            const isVerified = await verify();
            setIsAuthenticated(isVerified);
        };
        isVerified();
    }, []);

    const values = {
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

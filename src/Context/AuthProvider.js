import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// antd
import { Spin } from 'antd';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
            } else {
                navigate('/login');
            }
        });

        return () => {
            unsub();
        };
    }, []);

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

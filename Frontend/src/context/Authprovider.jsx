import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    // Retrieve the initial user from localStorage
    const initialUser = localStorage.getItem('Users');

    // Initialize state for authenticated user
    const [authUser, setAuthUser] = useState(
        initialUser ? JSON.parse(initialUser) : undefined
    );

    // Optional: To keep the state updated when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem('Users');
            setAuthUser(updatedUser ? JSON.parse(updatedUser) : undefined);
        };

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook for using the Auth context
export const useAuth = () => useContext(AuthContext);

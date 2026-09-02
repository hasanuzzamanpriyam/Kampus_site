import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
    setTheme: () => {}
});

export function ThemeProvider({ children }) {
    // 1. Initial State: Default to 'light'. Only 'dark' if explicitly chosen by user in localStorage.
    const [theme, setThemeState] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                return 'dark';
            }
        }
        return 'light';
    });

    // 2. Automatically sync 'dark' class on <html> documentElement & persist to localStorage
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    // 3. Toggle theme function (Light <-> Dark)
    const toggleTheme = () => {
        setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    const setTheme = (newTheme) => {
        if (newTheme === 'dark' || newTheme === 'light') {
            setThemeState(newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom Hook to consume theme context cleanly in any component
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

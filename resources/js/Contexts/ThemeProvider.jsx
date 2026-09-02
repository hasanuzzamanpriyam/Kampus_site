import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

const ThemeContext = createContext({
    theme: 'light',
    publicTheme: 'light',
    adminTheme: 'light',
    isAdmin: false,
    toggleTheme: () => {},
    setTheme: () => {}
});

export function ThemeProvider({ children }) {
    const checkIsAdmin = (pathname) => {
        return typeof pathname === 'string' && pathname.startsWith('/admin');
    };

    const [currentPath, setCurrentPath] = useState(() => {
        return typeof window !== 'undefined' ? window.location.pathname : '';
    });

    // 1. Public Theme State (Default: 'light')
    const [publicTheme, setPublicTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('public_theme');
            if (saved === 'dark') {
                return 'dark';
            }
        }
        return 'light';
    });

    // 2. Admin Theme State (Default: 'light')
    const [adminTheme, setAdminTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('admin_theme');
            if (saved === 'dark') {
                return 'dark';
            }
        }
        return 'light';
    });

    // 3. Listen to Inertia navigation & history changes to keep context strictly synchronized
    useEffect(() => {
        const handleLocation = () => {
            if (typeof window !== 'undefined') {
                setCurrentPath(window.location.pathname);
            }
        };

        const unsubs = [
            router.on('start', (event) => {
                if (event?.detail?.visit?.url) {
                    try {
                        const parsed = new URL(event.detail.visit.url, window.location.origin);
                        setCurrentPath(parsed.pathname);
                    } catch {
                        handleLocation();
                    }
                }
            }),
            router.on('navigate', handleLocation),
            router.on('finish', handleLocation)
        ];

        window.addEventListener('popstate', handleLocation);

        return () => {
            unsubs.forEach((unsub) => {
                if (typeof unsub === 'function') unsub();
            });
            window.removeEventListener('popstate', handleLocation);
        };
    }, []);

    const isAdmin = checkIsAdmin(currentPath);
    const activeTheme = isAdmin ? adminTheme : publicTheme;

    // 4. Synchronize <html> 'dark' class on documentElement based on the active context
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            if (activeTheme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [activeTheme, isAdmin]);

    // 5. Persist public and admin themes separately to localStorage
    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('public_theme', publicTheme);
        }
    }, [publicTheme]);

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('admin_theme', adminTheme);
        }
    }, [adminTheme]);

    // 6. Toggle theme function: switches ONLY the theme of the current view (admin or public)
    const toggleTheme = () => {
        if (isAdmin) {
            setAdminTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
        } else {
            setPublicTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
        }
    };

    const setTheme = (newTheme) => {
        if (newTheme !== 'dark' && newTheme !== 'light') return;
        if (isAdmin) {
            setAdminTheme(newTheme);
        } else {
            setPublicTheme(newTheme);
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: activeTheme,
                publicTheme,
                adminTheme,
                isAdmin,
                toggleTheme,
                setTheme
            }}
        >
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

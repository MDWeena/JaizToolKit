import { useAuthStore } from '@/store/auth.store';
import { usePathname } from 'expo-router';
import { useEffect } from 'react';

/**
 * Hook to track the user's current activity (path)
 * and save it to the store for potential session restoration.
 */
export const useTrackActivity = () => {
    const pathname = usePathname();
    const accessToken = useAuthStore((state) => state.user?.accessToken);
    const setReturnPath = useAuthStore((state) => state.setReturnPath);
    useEffect(() => {
        if (accessToken && pathname && !pathname.includes('(auth)')) {
            // Only update if the returnPath has actually changed to avoid unnecessary re-renders
            if (useAuthStore.getState().returnPath !== pathname) {
                setReturnPath(pathname);
            }
        }
    }, [pathname, accessToken, setReturnPath]);
};
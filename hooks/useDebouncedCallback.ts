import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const debounced = useCallback(
        (...args: Parameters<T>) => {
            cancel();

            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                callbackRef.current(...args);
            }, delay);
        },
        [delay, cancel]
    );

    return Object.assign(debounced, { cancel });
}

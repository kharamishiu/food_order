import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface UseAppWriteOptions<T, P extends Record<string, string | number>> {
    fn: (params: P) => Promise<T>;
    params?: P;
    skip?: boolean;
}

interface UseAppWriteReturn<T, P> {
    data: T | null,
    loading: boolean,
    error: string | null,
    refetch: (newParams?: P) => Promise<void>
}

const useAppWrite = <T, P extends Record<string, string | number>>({
    fn,
    params = {} as P,
    skip = false
}: UseAppWriteOptions<T, P>): UseAppWriteReturn<T, P> => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(!skip);
    const [error, setError] = useState<string | null>(null);


    const fetchData = useCallback(
        async (fetchParams: P) => {
            setLoading(true);
            setError(null);

            try {
                const result = await fn({ ...fetchParams });
                setData(result)

            } catch (error) {
                const errorMsg: string = error instanceof Error ? error.message : 'Error Unknown occurred';

                setError(errorMsg)

                Alert.alert('Error', errorMsg);
            } finally {
                setLoading(false);
            }
        },
        [fn]
    );

    useEffect(() => {
        if (!skip) fetchData(params)
    }, [])

    const refetch = async (newParams?: P) => await fetchData(newParams!)


    return { data, loading, error, refetch }
};

export default useAppWrite;
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const sendRequest = useCallback(
    async (
      requestConfig: { url: string; signal?: AbortSignal },
      applyData: any
    ) => {
      setIsLoading(true);

      try {
        const response = await fetch(requestConfig.url, {
          signal: requestConfig.signal,
        });

        if (!response.ok) throw new Error();

        const data = await response.json();
        setHasMore(data.length > 0);
        applyData(data);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
    hasMore,
  };
};

export default useHttp;

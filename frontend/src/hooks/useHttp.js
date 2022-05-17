import { useCallback, useState } from 'react';

const useHttp = (sendResponse) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers
            ? requestConfig.headers
            : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          body: requestConfig.body
            ? JSON.stringify(requestConfig.body)
            : requestConfig.formData,
        });

        if (!response.ok) {
          throw new Error('Faild to call url.');
        }
        const data = await response.json();
        sendResponse(data);
      } catch (err) {
        setError(err);
        setIsLoading(false);
        throw new Error('Something went wrong.');
      }
      setIsLoading(false);
    },
    [sendResponse]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
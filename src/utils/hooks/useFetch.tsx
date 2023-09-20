import { useState, useEffect } from "react";

interface UseFetchResult {
  data: any | null;
  isPending: boolean;
  error: any | null;
}

const useFetch = (url: string): UseFetchResult => {
  const [data, setData] = useState<any | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Error fetching users data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 500);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

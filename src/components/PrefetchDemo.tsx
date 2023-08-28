import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function PrefetchDemo() {
  const [showData, setShowData] = useState(false);
  const queryClient = useQueryClient();

  const fetchData = () => {
    return fetch("https://random-data-api.com/api/v2/users").then((res) =>
      res.json()
    );
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["prefetch-user-example"],
    queryFn: fetchData,
  });
  console.log("🚀 ~ file: PrefetchDemo.tsx:18 ~ PrefetchDemo ~ data:", data);

  useEffect(() => {
    // Data will be prefetched here once the component is mounted
    queryClient.prefetchQuery({
      queryKey: ["prefetch-user-example"],
      queryFn: fetchData,
    });
  }, [queryClient]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {(error as any).message}</p>;
  }

  return (
    <>
      <h1>Prefetching</h1>
      <button onClick={() => setShowData(true)}>Show prefetched data</button>
      {showData && <p>{data.username}</p>}
    </>
  );
}

export default PrefetchDemo;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// https://sharongrossman.medium.com/exploring-react-query-optimistic-rendering-a-practical-approach-44693f69e41
function OptimisticUpdate() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["OptimisticUpdate-example", page],
    () => {
      return fetch(`/api/my-data?page=${page}`).then((res) => res.json());
    },
    { keepPreviousData: true }
  );

  function handleNextClick() {
    setPage(page + 1);
  }

  function handlePrevClick() {
    setPage(page - 1);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {(error as any).message}</div>;
  }

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <div>
        <button onClick={handlePrevClick} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextClick} disabled={!data.hasMore}>
          Next
        </button>
      </div>
    </div>
  );
}

export default OptimisticUpdate;

import { useQuery } from "@tanstack/react-query";
import { fetchData, apiA } from "../api";
import ComponentB from "./ComponentB";

const ComponentA = () => {
  const { data, error, isLoading, isError, isFetching } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    queryFn: fetchData,
    retry: 1,
  });

  if (isLoading) return <div> Loading data... </div>;

  if (isError) return <div>error: {(error as any).message}</div>;

  return (
    <div>
      <p>ComponentA: {isFetching ? "Fetching Component A..." : data.hello}</p>
      <ComponentB />
    </div>
  );
};

export default ComponentA;

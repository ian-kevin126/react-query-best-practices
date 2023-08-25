import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, apiA } from "../api";

const ComponentC = ({ parentData }: any) => {
  const { data, isFetching } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    queryFn: fetchData,
    enabled: parentData !== undefined,
  });

  const queryClient = useQueryClient();

  const handleOnClick = () => {
    queryClient.refetchQueries({
      queryKey: [{ queryIdentifier: "api", apiName: apiA }],
    });
  };

  return (
    <div>
      <p>ComponentC: {isFetching ? "Fetching Component C..." : data.hello} </p>
      <button onClick={handleOnClick}>Refetch Parent Data</button>
    </div>
  );
};

export default ComponentC;

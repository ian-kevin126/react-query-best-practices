import { useQuery } from "@tanstack/react-query";
import { fetchData, apiB } from "../api";
import ComponentC from "./ComponentC";

const ComponentB = () => {
  const { data } = useQuery({
    queryKey: [{ queryIdentifier: "api", apiName: apiB }],
    queryFn: fetchData,
    onSuccess: (data) => console.log("Component B fetched data", data),
  });

  return (
    <div>
      <span>ComponentB: {data?.hello}</span>
      <ComponentC parentData={data} />
    </div>
  );
};

export default ComponentB;

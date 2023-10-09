import { IPost } from "@/types/post";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Spin } from "antd";

const UseMutation = () => {
  const { mutate, isLoading, error } = useMutation(
    (post: Partial<IPost>) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    {
      onSuccess: async (data) => {
        alert("Post added successfully: " + JSON.stringify(await data.json()));
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  if (error) {
    return <div>error...</div>;
  }

  const addHandler = () => {
    const body = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    mutate(body);
  };

  return (
    <Card title="useMutation - 基本用法">
      {isLoading ? <Spin /> : <Button onClick={addHandler}>Add Post</Button>}
    </Card>
  );
};

export default UseMutation;

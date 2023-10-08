import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchPosts =
  (page = 1) =>
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page + 1}`
    );
    return await response.json();
  };

export const deletePost = (id: number) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
};

function prefetch(newPage: number) {
  queryClient.prefetchQuery({
    queryFn: fetchPosts(newPage),
    queryKey: [`posts_${newPage}`],
  });
}

export const usePostsQuery = (page = 0) => {
  return {
    ...useQuery({ queryKey: [`posts_${page}`], queryFn: fetchPosts(page) }),
    prefetch,
  };
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return deletePost(id);
    },
  });
};

export const useGetPosts = (page = 0) =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page + 1}`
      );
      return data;
    },
    staleTime: 180000,
  });

export const getPostById = async (id: any) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return data;
};

export const useGetPostById = (postId: any) =>
  useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    staleTime: 180000,
  });

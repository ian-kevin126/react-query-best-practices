import { forwardRef, useEffect } from "react";
import { ITodo } from "@/types/todo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useInView } from "react-intersection-observer";

const InfiniteQueries = () => {
  const LIMIT = 10;

  // useInView 钩子可以轻松监控组件的 inView 状态。
  // 它将=返回一个对象，其中包含 ref、inView 状态和当前条目。
  // 我们需要将 ref 赋值给要监控的 DOM 元素，然后钩子就会报告状态。
  const { ref, inView } = useInView();

  const fetchTodos = async (page: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${LIMIT}`
    );
    return response.json();
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["todos"],
      queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam),
      // 函数同时接收无限数据列表的最后一页和所有页面的完整数组
      getNextPageParam: (lastPage, allPages) => {
        console.log(
          "🚀 ~ file: InfiniteQueries.tsx:25 ~ InfiniteQueries ~ allPages:",
          allPages
        );
        console.log(
          "🚀 ~ file: InfiniteQueries.tsx:25 ~ InfiniteQueries ~ lastPage:",
          lastPage
        );
        // 函数会检查 lastPage 数组的长度是否为 LIMIT，这表明最后一页是一整页的待办事项
        // nextPage 设置为 allPages.length + 1，表示至少还有一页要获取。否则，它会将 nextPage
        // 设为 undefined，表示没有其他页面要获取。nextPage 的返回值会传递给 fetchTodos 的 queryFn。
        const nextPage =
          lastPage.length === LIMIT ? allPages.length + 1 : undefined;

        return nextPage;
      },
    });

  console.log("data", data);

  useEffect(() => {
    // 在向下滚动到最后一个获取的待办事项时调用 fetchNextPage
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const content =
    isSuccess &&
    data.pages.map((page) =>
      page.map((todo: ITodo, i: number) => {
        /**
        如果（page.length === i + 1）表明我们要将 ref 附加到获取的待办事项列表中的最后一个待办事项。如果是列表中的最后一个待办事项，
        则附加 ref，否则不附加。本文即将结束。现在只需使用 useInView 钩子返回的 inView 状态监控最后一个文章 dom 节点，
        如果它有下一页，我们就会获取下一页。我们可以通过下面的代码实现这一功能：
         */
        // if (page.length === i + 1) {
        //   return <Todo ref={ref} key={todo.id} todo={todo} />;
        // }

        // 为了实现更好的用户体验，我们可以不检测最后一个元素/待办事项的可见性，而是将 ref 附加到倒数第三个元素/待办事项，
        // 这样当倒数第三个元素/待办事项可见时，我们就已经获取了下一个待办事项列表，用户无需等待加载状态，从而获得流畅无缝的体验。
        if (page.length >= 3 && page.length - 3 === i) {
          return <Todo ref={ref} key={todo.id} todo={todo} />;
        }

        return <Todo key={todo.id} todo={todo} />;
      })
    );

  return (
    <Card title="无限滚动查询 - InfiniteQueries">
      {content}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </Card>
  );
};

/**
在这里，由于我们将从 useInView 钩子分配引用 ref，因此需要将引用 ref 从列表组件向下转发到 Todo 组件。引用转发是一种可选功能，
它允许某些组件接收到引用后将其向下传递（换句话说，"转发"）给子组件。React 会将 ref 作为第二个参数传递给 forwardRef 
内部的 ({todo}, ref) => ...函数。我们将 ref 参数指定为 JSX 属性，从而将其转发到 
<article className="article" ref={ref}>。附加 ref 时，ref.current 将指向 
<article> DOM 节点。由于我们不想将 ref 附加到待办事项列表，因此只想从获取的列表中附加最后一个
待办事项。
 */
const Todo = forwardRef(({ todo }: { todo: ITodo }, ref: any) => {
  const todoContent = (
    <>
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? "Completed" : "To Complete"}</p>
    </>
  );

  const content = ref ? (
    <article ref={ref}>{todoContent}</article>
  ) : (
    <article>{todoContent}</article>
  );

  return content;
});

export default InfiniteQueries;

// https://articles.wesionary.team/how-to-implement-infinite-scroll-using-react-query-5fd7c425908f
// https://juejin.cn/post/7204345146162724920

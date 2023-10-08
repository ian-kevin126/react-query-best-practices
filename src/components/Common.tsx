import { queryClient } from "@/main";
import { CommonListProps } from "@/types/common";
import { List, Spin, Typography } from "antd";

export const CommonSpin = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Spin />
  </div>
);

export const CommonList = ({ data, extra }: CommonListProps<any>) => {
  return (
    <List
      style={{ margin: "12px 0" }}
      bordered
      dataSource={data}
      renderItem={(post: any, index: number) => (
        <List.Item extra={extra}>
          <Typography.Text>【{index + 1}】</Typography.Text>
          <span
            style={
              // 我们可以在此处访问查询数据，以显示缓存数据的粗体链接
              queryClient.getQueryData(["post", post.id])
                ? {
                    fontWeight: "bold",
                    color: "green",
                  }
                : {}
            }
          >
            {post.title}
          </span>
        </List.Item>
      )}
    />
  );
};

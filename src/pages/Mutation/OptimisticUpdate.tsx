import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  FETCH_ARTICLE_LIST_KEY,
  createArticleAPI,
  updateArticleAPI,
  useFetchArticleList,
} from "@/api/article";
import { Article } from "@/types/article";

type FieldType = {
  title?: string;
  content?: string;
  hasRead?: boolean;
  status?: string;
};

const OptimisticUpdate = () => {
  const [createArticleModalVisible, setCreateArticleModalVisible] =
    useState(false);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();
  const { data } = useFetchArticleList();

  const { mutate: createArticleMutate, mutateAsync } = useMutation({
    mutationFn: (newArticle: Article) => createArticleAPI(newArticle),
    // When mutate is called:
    onMutate: async (newArticle: Article) => {
      // 取消任何传出的重试
      //（这样它们就不会覆盖我们的乐观更新）
      await queryClient.cancelQueries({ queryKey: [FETCH_ARTICLE_LIST_KEY] });

      // 前一个值的快照
      const prevArticles = queryClient.getQueryData<Article[]>([
        FETCH_ARTICLE_LIST_KEY,
      ]);

      // 乐观地更新为新值
      if (prevArticles) {
        queryClient.setQueryData<Article[]>(
          [FETCH_ARTICLE_LIST_KEY],
          [...prevArticles, newArticle]
        );
      }

      // 返回包含快照值的上下文对象
      return { prevArticles };
    },
    // 如果更新失败，使用上下文回滚我们的配置更新
    onError: (err, variables, context) => {
      console.log(
        "🚀 ~ file: OptimisticUpdate.tsx:66 ~ OptimisticUpdate ~ variables:",
        variables,
        err
      );
      if (context?.prevArticles) {
        queryClient.setQueryData<Article[]>(
          [FETCH_ARTICLE_LIST_KEY],
          context.prevArticles
        );
      }
    },
    // 其他配置更改可能已经发生，触发数据重获取
    // 但值得注意的是，自突变开始以来，我们的用户界面一直是正确的
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_ARTICLE_LIST_KEY] });
    },
  });

  console.log("createArticleMutate", createArticleMutate);

  const { mutate: updateArticleMutate } = useMutation({
    mutationFn: (curArticle: Article) => updateArticleAPI(curArticle),
    // When mutate is called:
    onMutate: async (curArticle: Article) => {
      // 取消任何传出的重试
      //（这样它们就不会覆盖我们的乐观更新）
      await queryClient.cancelQueries({ queryKey: [FETCH_ARTICLE_LIST_KEY] });

      // 前一个值的快照
      const prevArticles = queryClient.getQueryData<Article[]>([
        FETCH_ARTICLE_LIST_KEY,
      ]);

      // 乐观地更新为新值
      if (prevArticles) {
        queryClient.setQueryData<Article[]>(
          [FETCH_ARTICLE_LIST_KEY],
          prevArticles.map((item: Article) =>
            curArticle.id === item.id
              ? { ...item, hasRead: !item.hasRead }
              : item
          )
        );
      }

      // 返回包含快照值的上下文对象
      return { prevArticles };
    },
    // 如果更新失败，使用上下文回滚我们的配置更新
    onError: (err, variables, context) => {
      console.log(
        "🚀 ~ file: OptimisticUpdate.tsx:120 ~ OptimisticUpdate ~ variables:",
        variables,
        err
      );
      if (context?.prevArticles) {
        queryClient.setQueryData<Article[]>(
          [FETCH_ARTICLE_LIST_KEY],
          context.prevArticles
        );
      }
    },
    // 其他配置更改可能已经发生，触发数据重获取
    // 但值得注意的是，自突变开始以来，我们的用户界面一直是正确的
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FETCH_ARTICLE_LIST_KEY] });
    },
  });

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "是否已读",
      dataIndex: "hasRead",
      key: "hasRead",
      render: (hasRead: boolean) => (
        <Tag color={hasRead ? "green" : "grey"}>
          {hasRead ? "已读" : "未读"}
        </Tag>
      ),
    },
    {
      title: "操作",
      render: (item: Article) => (
        <Space>
          <Button
            onClick={() => {
              updateArticleMutate({ ...item, hasRead: !item.hasRead });
            }}
          >
            切换状态
          </Button>
        </Space>
      ),
    },
  ];

  const handleOpenCreateArticleModal = () => {
    setCreateArticleModalVisible(true);
  };

  const onFinish = async (values: Article) => {
    try {
      const res = await mutateAsync({ ...values });
      if ([201, 200].includes(res.status)) {
        messageApi.open({
          type: "success",
          content: "成功新增Article！",
        });
        setCreateArticleModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }

    // createArticleMutate({ ...values });
    // setCreateArticleModalVisible(false);
    // form.resetFields();
  };

  const onFinishFailed = () => {
    //
  };

  return (
    <Card
      title="useMutation - 乐观更新"
      extra={
        <Button onClick={handleOpenCreateArticleModal} type="primary">
          新增
        </Button>
      }
    >
      {contextHolder}
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record: Article) => record?.id + record.title}
        pagination={false}
      />
      {createArticleModalVisible && (
        <Modal
          open={createArticleModalVisible}
          centered
          closable
          title="新增 Article"
          footer={false}
          onCancel={() => {
            setCreateArticleModalVisible(false);
            form.resetFields();
          }}
        >
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            style={{ maxWidth: 600, padding: "30px 30px 0 20px" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              title: "",
              content: "",
              hasRead: true,
              status: "empty",
            }}
          >
            <Form.Item<FieldType>
              label="标题"
              name="title"
              rules={[{ required: true, message: "请输入标题!" }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>

            <Form.Item<FieldType>
              label="内容"
              name="content"
              rules={[{ required: true, message: "请输入内容!" }]}
            >
              <Input.TextArea placeholder="请输入内容" />
            </Form.Item>

            <Form.Item<FieldType>
              label="是否已读"
              name="hasRead"
              valuePropName="checked"
              rules={[{ required: true, message: "请选择是否已读!" }]}
            >
              <Radio.Group defaultValue={true}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item<FieldType>
              label="状态"
              name="status"
              rules={[{ required: true, message: "请选择状态!" }]}
            >
              <Radio.Group defaultValue={"available"}>
                <Radio value={"available"}>available</Radio>
                <Radio value={"empty"}>empty</Radio>
                <Radio value={"stale"}>stale</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
              <Button type="primary" htmlType="submit">
                提 交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Card>
  );
};

export default OptimisticUpdate;

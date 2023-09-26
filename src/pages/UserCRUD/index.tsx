import React, { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Popconfirm, Space, Spin, Table, message } from "antd";
import {
  FETCH_USER_LIST_KEY,
  useCreateUserM,
  useDeleteUserM,
  useFetchUserList,
  useUpdateUserM,
} from "@/api/user";
import { CreateUserModal } from "./components/CreateUser";
import UserDetail from "./components/UserDetail";
import { IUser } from "@/types/user";

const UserCRUDList: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const [currentId, setCurrentId] = useState<number | undefined>();
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<IUser | undefined>();

  const { data: userList, isLoading, isError, error } = useFetchUserList();
  const createUserM = useCreateUserM();
  const updateUserM = useUpdateUserM();
  const deleteUserM = useDeleteUserM();

  const goToUserDetail = (id: number) => {
    setCurrentId(id);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const res = await deleteUserM.mutateAsync(id);
      if (res && res.status === 200) {
        messageApi.success("删除用户成功！");
        queryClient.invalidateQueries([FETCH_USER_LIST_KEY]);
      } else {
        messageApi.error("删除用户失败，请稍后重试！");
      }
    } catch (error) {
      messageApi.error(`删除用户失败，请稍后重试！- ${JSON.stringify(error)}`);
    }
  };

  const handleEditUser = (record: IUser) => {
    setCreateUserModalVisible(true);
    setCurrentItem(record);
  };

  const columns = [
    {
      title: "名字",
      key: "name",
      dataIndex: "name",
      align: "center",
      width: "25%",
    },
    {
      title: "邮箱",
      key: "email",
      dataIndex: "email",
      align: "center",
      width: "25%",
    },
    {
      title: "号码",
      key: "number",
      dataIndex: "number",
      align: "center",
      width: "25%",
    },
    {
      title: "操作",
      align: "center",
      width: "25%",
      render: (record: IUser) => {
        return (
          <Space>
            <Button onClick={() => goToUserDetail(record.id)}>详情</Button>
            <Button onClick={() => handleEditUser(record)}>更新</Button>
            <Popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => handleDeleteUser(record.id)}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleAddUser = () => {
    setCreateUserModalVisible(true);
  };

  const handleClose = useCallback(() => {
    setCreateUserModalVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (values: Partial<IUser>) => {
      const isEdit = Boolean(values?.id);
      const api = isEdit ? updateUserM : createUserM;
      try {
        const res = await api.mutateAsync({ ...values });
        if (res && (res.status === 200 || res.status === 201)) {
          messageApi.success(`${isEdit ? "编辑" : "添加"}用户成功！`);
          queryClient.invalidateQueries([FETCH_USER_LIST_KEY]);
        } else {
          messageApi.error(`${isEdit ? "编辑" : "添加"}用户失败，请稍后重试！`);
        }
      } catch (error) {
        messageApi.error(
          `${isEdit ? "编辑" : "添加"}用户失败，请稍后重试！- ${JSON.stringify(
            error
          )}`
        );
      }
      setCurrentItem(undefined);
    },
    [createUserM, updateUserM, messageApi, queryClient]
  );

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Card
      title="基础CRUD"
      extra={
        <Button onClick={handleAddUser} type="primary">
          新增
        </Button>
      }
    >
      {contextHolder}
      <Table
        rowKey={(record: IUser) => record.id}
        dataSource={userList}
        columns={columns as any}
      />
      <UserDetail id={currentId} />
      {createUserModalVisible && (
        <CreateUserModal
          visible={createUserModalVisible}
          currentItem={currentItem}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
    </Card>
  );
};

export default UserCRUDList;

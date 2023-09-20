import { useCreateUserM } from "@/api/user";
import { IUser } from "@/types/todo";
import { Button, Form, Input, Modal } from "antd";

interface FieldType {
  name?: string;
  email?: string;
  number?: string;
}

interface ICreateUserModalProps {
  visible: boolean;
  handleClose: () => void;
  currentItem: IUser | undefined;
}

export const CreateUserModal = ({
  visible,
  handleClose,
  currentItem,
}: ICreateUserModalProps) => {
  const createUserM = useCreateUserM();

  const _modalTitle = currentItem ? "编辑" : "新建";

  const onFinish = async (values: FieldType) => {
    await createUserM.mutateAsync({ ...values });
    handleClose();
  };

  const onFinishFailed = () => {
    // ...
  };

  return (
    <Modal
      open={visible}
      title={`${_modalTitle}用户`}
      closable
      centered
      onCancel={handleClose}
      footer={null}
      okText="提 交"
      cancelText="取 消"
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ padding: "30px 20px 10px 0" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="名 字"
          name="name"
          rules={[{ required: true, message: "请输入名字!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮 箱"
          name="email"
          rules={[{ required: true, message: "请输入邮箱!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="号 码"
          name="number"
          rules={[{ required: true, message: "请输入号码!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
          <Button type="primary" htmlType="submit">
            提 交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

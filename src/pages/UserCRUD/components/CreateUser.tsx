import { IUser } from "@/types/todo";
import { Button, Form, Input, Modal } from "antd";

interface ICreateUserModalProps {
  visible: boolean;
  handleClose: () => void;
  currentItem: IUser | undefined;
  handleSubmit: (values: Partial<IUser>) => void;
}

const DEFAULT_VALUES: Partial<IUser> = {
  name: "",
  email: "",
  number: "",
};

export const CreateUserModal = ({
  visible,
  handleClose,
  currentItem,
  handleSubmit,
}: ICreateUserModalProps) => {
  const isEdit = Boolean(currentItem);
  const _modalTitle = isEdit ? "编辑" : "新建";

  const onFinish = async (values: Partial<IUser>) => {
    handleSubmit(isEdit ? { id: currentItem?.id, ...values } : values);
    handleClose();
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
        initialValues={currentItem ?? DEFAULT_VALUES}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<Partial<IUser>>
          label="名 字"
          name="name"
          rules={[{ required: true, message: "请输入名字!" }]}
        >
          <Input placeholder="请输入名字" />
        </Form.Item>

        <Form.Item<Partial<IUser>>
          label="邮 箱"
          name="email"
          rules={[{ required: true, message: "请输入邮箱!" }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item<Partial<IUser>>
          label="号 码"
          name="number"
          rules={[{ required: true, message: "请输入号码!" }]}
        >
          <Input placeholder="请输入号码" />
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

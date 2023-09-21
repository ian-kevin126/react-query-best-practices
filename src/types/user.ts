export interface INavListItem {
  title: string;
  to: string;
}

export interface IUser {
  id: number;
  name: string;
  email?: string;
  number?: string;
}

export interface ICreateUserModalProps {
  visible: boolean;
  handleClose: () => void;
  currentItem: IUser | undefined;
  handleSubmit: (values: Partial<IUser>) => void;
}

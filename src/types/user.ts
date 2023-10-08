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

export interface IUserItem {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

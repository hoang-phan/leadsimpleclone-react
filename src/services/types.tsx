export type IPhone = {
  id: string;
  value: string;
  kind: string;
  _destroy: string;
};

export type IEmail = {
  id: string;
  value: string;
  kind: string;
  _destroy: string;
};

export type ISource = {
  id: string;
  name: string;
};

export type IContact = {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  createdAt: string;
  source: ISource;
  emails: [IEmail];
  phones: [IPhone];
};

export type IPhone = {
  value: string;
  kind: string;
}

export type IEmail = {
  value: string;
  kind: string;
}

export type ISource = {
  id: string;
  name: string;
}

export type IContact = {
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  createdAt: string;
  source: ISource;
  emails: [IEmail];
  phones: [IPhone];
}

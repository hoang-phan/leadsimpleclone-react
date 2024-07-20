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
  _destroy: string;
};

export type ILead = {
  id: string;
  name: string;
  emailsSent: number;
  callsMade: number;
  contacts: [IContact];
  stage: IStage;
  createdAt: string;
  assignee: IUser;
};

export type IStage = {
  id: string;
  name: string;
  color: string;
};

export type IUser = {
  id: string;
  email: string;
};

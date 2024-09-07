export interface User {
  uuid: string;
  firstName: string;
  secondName: string;
  lastName: string;
  surName: string;
  documentNumber: string;
  email: string;
  documentType: string;
}

export interface UserModel {
  uuid: string;
  firstName: string;
  secondName: string;
  lastName: string;
  surName: string;
  documentNumber: string;
  email: string;
  documentType_id: string;
}

export interface ICertificate {
  ID: string;
  TABLENAME: string;
  PRIMARYKEY: string;
  NAME: string;
  PRICE: string;
  SUMMA: string;
  DISCOUNT: string;
}

export interface ICertificateData {
  response: ICertificate[];
}

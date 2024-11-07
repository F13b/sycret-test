import { makeAutoObservable } from "mobx";
import { ICertificate } from "../types";

class CertificateStore {
  certificate = {} as ICertificate;

  constructor() {
    makeAutoObservable(this);
  }

  setCertificate = (value: ICertificate) => (this.certificate = value);
  removeCertificate = () => (this.certificate = {} as ICertificate);
}

export default new CertificateStore();

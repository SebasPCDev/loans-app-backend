import { ErrorMessages } from "./errorMessages";

export class CustomErrors extends Error {
  public statusCode: number;
  public errorCode: string;

  constructor(errorCode: string, statusCOde: number) {
    super(ErrorMessages[errorCode] || "Error desconocido");
    this.statusCode = statusCOde;
    this.errorCode = errorCode;
    this.name = "CustomError";
  }
}

import { ErrorMessages } from "./errorMessages";

export class CustomErrors extends Error {
  public errorCode: string;
  public statusCode: number;

  constructor(errorCode: string) {
    const errorDetails = ErrorMessages[errorCode];

    if (errorDetails) {
      super(errorDetails.message);
      this.statusCode = errorDetails.statusCode;
    } else {
      super("Error desconocido");
      this.statusCode = 500;
    }

    this.errorCode = errorCode;
    this.name = "CustomError";
  }

  public returnError(response: any) {
    return response.status(this.statusCode).json({
      message: this.message,
      errorCode: this.statusCode,
    });
  }
}

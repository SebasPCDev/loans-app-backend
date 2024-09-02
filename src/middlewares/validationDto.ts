import { classToPlain, plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationDtoMiddleware(
  type: any
): (req: Request, res: Response, next: NextFunction) => void {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Paso 1: Validar los datos del body con el DTO
    const dto = plainToInstance(type, req.body);

    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      // Construir mensaje de error con detalles
      const message = errors.reduce((acc, error) => {
        return { ...acc, ...error.constraints };
      }, {});
      return res.status(400).send({ message: Object.values(message) });
    }

    // Verificar campos adicionales
    const allowedFields = Object.keys(plainToClass(type, {}));
    const bodyFields = Object.keys(req.body);

    const invalidFields = bodyFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).send({
        message: `Campos adicionales no permitidos: ${invalidFields.join(
          ", "
        )}`,
      });
    }

    next();
  };
}

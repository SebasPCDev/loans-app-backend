import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { error } from "console";
import { Request, Response, NextFunction } from "express";

export function validationDtoMiddleware(
  type: any
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);

    validate(dto).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.reduce((acc, error) => {
          return { ...acc, ...error.constraints };
        }, {});
        res.status(400).send({ message: Object.values(message) });
      } else {
        next();
      }
    });
  };
}

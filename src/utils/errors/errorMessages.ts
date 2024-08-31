export const ErrorMessages: {
  [key: string]: { message: string; statusCode: number };
} = {
  AUTHENTICATION_FAILED: {
    message: "Usuario o contraseña incorrectos",
    statusCode: 401,
  },
  UNAUTHORIZED: {
    message: "No tienes permiso para acceder a esta información",
    statusCode: 401,
  },
  SIGNUP_FAILED: {
    message: "Error al registrar el usuario",
    statusCode: 400,
  },
  USER_NOT_FOUND: {
    message: "Usuario no encontrado",
    statusCode: 404,
  },
  USER_ALREADY_EXISTS: {
    message: "El usuario ya existe",
    statusCode: 409,
  },
  ALL_FIELDS_REQUIRED: {
    message: "Todos los campos son requeridos",
    statusCode: 400,
  },
  USER_ALREADY_LOGGED_IN: {
    message: "Ya tienes una sesión iniciada",
    statusCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    message: "Error interno del servidor",
    statusCode: 500,
  },
};

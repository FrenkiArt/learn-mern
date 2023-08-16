import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").trim().isEmail(),
  body("password", "Минимум 5 символов").trim().isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").trim().isEmail(),
  body("password", "Минимум 5 символов").trim().isLength({ min: 5 }),
  body("fullName", "Минимум 3 символа").trim().isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().trim().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").trim().isLength({ min: 2 }),
  body("text", "Введите текст статьи").trim().isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)")
    .optional()
    .trim()
    .isArray(),
  body("imageUrl", "Неверная ссылка на изображение")
    .optional()
    .trim()
    .isString(),
];

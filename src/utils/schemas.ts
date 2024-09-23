import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(20, {
      message: "Title must be at most 20 characters long",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, {
      message: "Description must be at least 10 characters long",
    }),
});

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, {
      message: "Username must be at least 1 character long",
    })
    .max(50),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(3, {
      message: "Email must be at least 3 characters long",
    })
    .max(200)
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3, { message: "Password must be at least 3 characters long" }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(3, {
      message: "Email must be at least 3 characters long",
    })
    .max(200)
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3, { message: "Password must be at least 3 characters long" }),
});

export const CommentSchema = z.object({
  text: z
    .string({
      required_error: "Email is required",
    })
    .min(3, { message: "Comment must be at least 3 characters" })
    .max(400),
  articleId: z.number({ required_error: "Article Id required" }),
});

export const updateUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, {
      message: "Username must be at least 1 character long",
    })
    .max(50)
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(3, {
      message: "Email must be at least 3 characters long",
    })
    .max(200)
    .email()
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3, { message: "Password must be at least 3 characters long" })
    .optional(),
});

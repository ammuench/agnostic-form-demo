import type { z } from "zod";

export type ZodErrors<T extends Record<string, unknown>> = Partial<{
  [key in keyof T]?: string;
}>;

const parseZodErrors = <T extends Record<string, unknown>>(
  err: z.ZodError,
): ZodErrors<T> => {
  const formattedErrors: ZodErrors<T> = {};
  err.errors.forEach((zodError) => {
    formattedErrors[zodError.path[0] as keyof T] = zodError.message;
  });

  return formattedErrors;
};

export default parseZodErrors;

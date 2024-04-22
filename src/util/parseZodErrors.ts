import { ZodError, z } from "zod";

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

const testArrSchema = z.object({
  testArrFoo: z.string(),
  testArrBar: z.string(),
});

const testSchema = z.object({
  fooString: z.string(),
  fooNum: z.number(),
  fooObj: z.object({
    fooObjOne: z.string(),
    fooObjTWo: z.number(),
  }),
  fooStringArray: z.array(z.string()),
  fooArray: z.array(testArrSchema),
});

type TestSchema = z.infer<typeof testSchema>;

type DynamicErrorsShape<T extends Record<string, unknown>> = Partial<{
  [key in keyof T]?: T[key] extends string | number
    ? {
        message: string;
      }
    : T[key] extends Array<string | number>
      ? {
          message: string;
          [arrayKey: number]: {
            message: string;
          };
        }
      : T[key] extends Array<Record<string, unknown>>
        ? {
            message: string;
            testType: T[key];
            [arrayKey: number]: DynamicErrorsShape<T[key][0]>;
          }
        : {
            message: string;
          };
}>;

type myTestType = DynamicErrorsShape<TestSchema>;
console.log({} as myTestType);

export const parseDynamicErrors = <T extends Record<string, unknown>>(
  err: z.ZodError,
): DynamicErrorsShape<T> => {
  let formattedErrors: DynamicErrorsShape<T> = {};
  err.errors.forEach((zodError) => {
    console.log(zodError);
    if (zodError.path.length === 1) {
      formattedErrors = {
        ...formattedErrors,
        [zodError.path[0] as keyof T]: { message: zodError.message },
      };
    } else if (zodError.path.length === 2) {
      if (typeof zodError.path[1] === "string") {
        formattedErrors = {
          ...formattedErrors,
          [zodError.path[0] as keyof T]: {
            ...formattedErrors[zodError.path[0] as keyof T],
            message: `Error in '${zodError.path[0]}' child`,
            [zodError.path[1]]: {
              message: zodError.message,
            },
          },
        };
      } else if (typeof zodError.path[1] === "number") {
        formattedErrors = {
          ...formattedErrors,
          [zodError.path[0] as keyof T]: {
            ...formattedErrors[zodError.path[0] as keyof T],
            message: `Error in '${zodError.path[0]} chilld'`,
            [zodError.path[1]]: {
              message: zodError.message,
            },
          },
        };
      }
    } else if (zodError.path.length === 3) {
      if (typeof zodError.path[1] === "number") {
        formattedErrors = {
          ...formattedErrors,
          [zodError.path[0] as keyof T]: {
            ...formattedErrors[zodError.path[0] as keyof T],
            message: `Error in '${zodError.path[0]}' child`,
            [zodError.path[1]]: {
              // @ts-expect-error This works, but struggles to infer the type
              ...((formattedErrors[zodError.path[0] as keyof T] || {})[
                zodError.path[1].toString()
              ] || {}),
              [zodError.path[2]]: {
                message: zodError.message,
              },
            },
          },
        };
      }
    }
  });

  return formattedErrors;
};

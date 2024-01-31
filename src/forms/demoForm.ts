import { ZodError, z } from "zod";

import { create } from "zustand";
import parseZodErrors, { ZodErrors } from "../util/parseZodErrors";

export const DemoFormSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
  zipCode: z.number(),
});

type DemoForm = z.infer<typeof DemoFormSchema>;

type DemoFormErrors = ZodErrors<DemoForm>;

type DemoFormState = {
  values: Partial<DemoForm>;
  errors: DemoFormErrors;
  setFormValue: <T extends keyof DemoForm>(key: T, value: DemoForm[T]) => void;
  validateForm: () => void;
};

export const useDemoForm = create<DemoFormState>((set, get) => ({
  values: {},
  errors: {},
  setFormValue: (key, value) =>
    set((state) => ({
      values: {
        ...state.values,
        [key]: value,
      },
    })),
  validateForm: () => {
    try {
      DemoFormSchema.parse(get().values);
      set(() => ({ errors: {} }));
    } catch (e: unknown) {
      set(() => ({ errors: parseZodErrors(e as ZodError<DemoForm>) }));
    }
  },
}));

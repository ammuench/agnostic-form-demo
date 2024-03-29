import { ZodError, z } from "zod";

import { create } from "zustand";
import parseZodErrors, { ZodErrors } from "../util/parseZodErrors";

export const DemoFormSchema = z.object({
  name: z.string().trim().min(1),
  age: z.number().gte(13, "Age must be greater than or equal to 13"),
  email: z.string().email(),
  zipCode: z
    .string()
    .regex(/^\d{5}(?:[-\s]\d{4})?$/i, "Zipcode must be in valid format"),
});

type DemoForm = z.infer<typeof DemoFormSchema>;

type DemoFormErrors = ZodErrors<DemoForm>;

type DemoFormState = {
  values: Partial<DemoForm>;
  touched: Partial<Record<keyof DemoForm, boolean>>;
  errors: DemoFormErrors;
  resetForm: () => void;
  setFormValue: <T extends keyof DemoForm>(key: T, value: DemoForm[T]) => void;
  validateForm: () => boolean;
};

export const useDemoForm = create<DemoFormState>((set, get) => ({
  values: {},
  touched: {},
  errors: {},
  resetForm: () => {
    set(() => ({
      values: {},
      touched: {},
      errors: {},
    }));
  },
  setFormValue: (key, value) => {
    set((state) => ({
      values: {
        ...state.values,
        [key]: value,
      },
      touched: {
        ...state.touched,
        [key]: true,
      },
    }));
  },
  validateForm: () => {
    try {
      DemoFormSchema.parse(get().values);
      set(() => ({ errors: {} }));
      return true;
    } catch (e: unknown) {
      set((state) => {
        const errors = parseZodErrors(e as ZodError<DemoForm>);
        const touched = {
          ...state.touched,
          ...Object.entries(errors).reduce((touchedVals, [errKey]) => {
            return { ...touchedVals, [errKey]: true };
          }, {}),
        };
        return {
          touched,
          errors,
        };
      });
      return false;
    }
  },
}));

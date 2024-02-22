import { ReactNode } from "react";
import { useDemoForm } from "../forms/demoForm";
import { twMerge } from "tailwind-merge";

type FormControlProps = {
  label?: string;
  children: ReactNode | ReactNode[];
  error?: string;
};
const FormControl = ({ label, error, children }: FormControlProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      {!!label && (
        <div className="label">
          <span className={twMerge("label-text", !!error && "text-red-500")}>
            {label}
          </span>
        </div>
      )}
      <div className={twMerge(!!error && "[&>*]:border-red-500")}>
        {children}
      </div>
      {!!error && (
        <div className="label">
          <span className="label-text-alt text-red-500">{error}</span>
        </div>
      )}
    </label>
  );
};

export const ExampleOne = () => {
  const demoForm = useDemoForm();
  return (
    <section className="w-96 flex flex-col gap-4">
      <FormControl
        label="Name"
        error={(demoForm.touched.name && demoForm.errors.name) || ""}
      >
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-96"
          value={demoForm.values.name || ""}
          onChange={(event) => {
            demoForm.setFormValue("name", event.target.value);
          }}
        />
      </FormControl>
      <FormControl
        label="Email"
        error={(demoForm.touched.email && demoForm.errors.email) || ""}
      >
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-96"
          value={demoForm.values.email || ""}
          onChange={(event) => {
            demoForm.setFormValue("email", event.target.value);
          }}
        />
      </FormControl>
      <FormControl
        label="Age (min-age 13)"
        error={(demoForm.touched.age && demoForm.errors.age) || ""}
      >
        <input
          type="number"
          className="input input-bordered input-primary w-96"
          value={demoForm.values.age || ""}
          onChange={(event) => {
            demoForm.setFormValue("age", parseInt(event.target.value));
          }}
        />
      </FormControl>
      <FormControl
        label="Zip Code"
        error={(demoForm.touched.zipCode && demoForm.errors.zipCode) || ""}
      >
        <input
          type="text"
          className="input input-bordered input-primary w-96"
          value={demoForm.values.zipCode || ""}
          onChange={(event) => {
            demoForm.setFormValue("zipCode", event.target.value);
          }}
        />
      </FormControl>
    </section>
  );
};

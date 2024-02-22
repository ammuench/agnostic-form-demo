import { useMemo, useState } from "react";
import { useDemoForm } from "../forms/demoForm";
import { twMerge } from "tailwind-merge";

export const SubmitSection = () => {
  const demoForm = useDemoForm();

  const formHasErrors = useMemo(() => {
    return Object.values(demoForm.errors).length > 0;
  }, [demoForm.errors]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const validateForm = () => {
    if (demoForm.validateForm()) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col col-span-2 self-end">
        {formHasErrors && (
          <small className="text-red-500 font-bold mb-4">
            The form has errors that must be corrected before submitting
          </small>
        )}
        <button
          className={twMerge(
            formHasErrors && "border border-red-500 text-red-500",
          )}
          onClick={validateForm}
        >
          Validate
        </button>
      </div>
      {isModalOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Form Submitted!</h3>
            <p className="py-4">Form was validated and submitted!</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  demoForm.resetForm();
                  setIsModalOpen(false);
                }}
              >
                Reset Form &amp; Close Modal
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

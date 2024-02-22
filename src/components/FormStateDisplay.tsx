import { useDemoForm } from "../forms/demoForm";

export const FormStateDisplay = () => {
  const demoForm = useDemoForm();

  return (
    <section className="w-full h-full flex flex-col justify-center">
      <div>
        <h3 className="text-lg font-bold">Form Value</h3>
        <code className="border border-slate-400 w-full block min-h-[50%] p-4 font-mono whitespace-pre-wrap break-all ">
          {JSON.stringify(demoForm.values)}
        </code>
      </div>
      <div>
        <h3 className="text-lg font-bold">Form Errors</h3>
        <code className="border border-slate-400 w-full block min-h-[50%] p-4 font-mono whitespace-pre-wrap break-all ">
          {JSON.stringify(demoForm.errors)}
        </code>
      </div>
      <div>
        <h3 className="text-lg font-bold">Form Touch State</h3>
        <code className="border border-slate-400 w-full block min-h-[50%] p-4 font-mono whitespace-pre-wrap break-all ">
          {JSON.stringify(demoForm.touched)}
        </code>
      </div>
    </section>
  );
};

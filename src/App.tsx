import { useDemoForm } from "./forms/demoForm";

import "./App.css";

function App() {
  const demoForm = useDemoForm();

  return (
    <section className="w-96 flex flex-col gap-4">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full w-96"
          value={demoForm.values.name || ""}
          onChange={(event) => {
            demoForm.setFormValue("name", event.target.value);
          }}
        />
        {demoForm.errors.name && (
          <div className="label">
            <span className="label-text-alt text-red-500">
              {demoForm.errors.name}
            </span>
          </div>
        )}
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full w-96"
          value={demoForm.values.email || ""}
          onChange={(event) => {
            demoForm.setFormValue("email", event.target.value);
          }}
        />
        {demoForm.errors.email && (
          <div className="label">
            <span className="label-text-alt text-red-500">
              {demoForm.errors.email}
            </span>
          </div>
        )}
      </label>
      <button onClick={demoForm.validateForm}>Validate</button>
    </section>
  );
}

export default App;

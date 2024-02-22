import "./App.css";
import { ExampleOne } from "./components/ExampleOne";
import { FormStateDisplay } from "./components/FormStateDisplay";
import { SubmitSection } from "./components/SubmitSection";

// const fromExampleRenderer = (exampleToUse: FormExampleEnum): JSX.Element => {
//   switch (exampleToUse) {
//     default:
//       return <ExampleOne />;
//   }
// };

const App = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr] grid-rows-[auto_1fr_auto] gap-4 items-center h-full">
      <h1 className="col-span-2 self-end">Zod + Zustand Simple Form</h1>
      <ExampleOne />
      <FormStateDisplay />
      <SubmitSection />
    </div>
  );
};

export default App;

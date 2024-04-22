import { z } from "zod";
import "./App.css";
import { ExampleOne } from "./components/ExampleOne";
import { FormStateDisplay } from "./components/FormStateDisplay";
import { SubmitSection } from "./components/SubmitSection";
import { parseDynamicErrors } from "./util/parseZodErrors";

// const fromExampleRenderer = (exampleToUse: FormExampleEnum): JSX.Element => {
//   switch (exampleToUse) {
//     default:
//       return <ExampleOne />;
//   }
// };

const App = () => {
  try {
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

    console.log(testSchema.parse({ fooObj: {}, fooStringArray: [1] }));
  } catch (e) {
    console.error(e);
    const output = parseDynamicErrors(e);
    console.warn(output);
  }

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

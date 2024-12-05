import React from "react";
import CategorizeView from "@/components/form-view/categorize-view";
import ClozeView from "@/components/form-view/cloze-view";
import CompView from "@/components/form-view/comp-view";

const categorizeData = {
  categories: ["hi", "hello", "welcome"],
  groupedItems: {
    hi: ["i1", "i3"],
    hello: ["i2", "i488"],
  },
};

const clozeData = {
  sentence:
    "World War II was fought between the Allies and the <u>____</u> powers. It started in <u>____</u> and ended in <u>____</u>.",
  options: [
    { id: "option-0", content: "Axis" },
    { id: "option-1", content: "1939" },
    { id: "option-2", content: "1945" },
  ],
};

const compData = [
  {
    questionText: "hiiiiiiiiiiiiiiiii",
    options: ["1111", "2222222222", "33333"],
    correctOption: "",
  },
  {
    questionText: "biiiiiiiiiiiiiiiiiiii",
    options: ["4444444", "5555555555555"],
    correctOption: "",
  },
];

const App = () => {
  return (
    <div className="p-6">
      <CategorizeView categorizeData={categorizeData} />
      <ClozeView clozeData={clozeData} />
      <CompView compData={compData} />
    </div>
  );
};

export default App;

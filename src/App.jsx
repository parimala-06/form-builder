import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Catogorize from "./components/form-editor/catogorize";
import Comprehension from "./components/form-editor/comprehension";
import Cloze from "./components/form-editor/cloze";
import QuestionCard from "./components/form-editor/question-card";
import FormBuilderPage from "./page/form-builder";
import FormView from "./page/form-view";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <FormBuilderPage />
      <FormView />
    </div>
  );
}

export default App;

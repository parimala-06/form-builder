import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Catogorize from "./components/form-editor/catogorize";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* <h1 className="text-3xl font-bold underline text-blue-700">
        Hello world!
      </h1>
      <Button>Click me</Button> */}
      <Catogorize />
    </div>
  );
}

export default App;

// import React from "react";
// import CategorizeView from "@/components/form-view/categorize-view";
// import ClozeView from "@/components/form-view/cloze-view";
// import CompView from "@/components/form-view/comp-view";

// const categorizeData = {
//   categories: ["hi", "hello", "welcome"],
//   groupedItems: {
//     hi: ["i1", "i3"],
//     hello: ["i2", "i488"],
//   },
// };

// const clozeData = {
//   sentence:
//     "World War II was fought between the Allies and the <u>____</u> powers. It started in <u>____</u> and ended in <u>____</u>.",
//   options: [
//     { id: "option-0", content: "Axis" },
//     { id: "option-1", content: "1939" },
//     { id: "option-2", content: "1945" },
//   ],
// };

// const compData = [
//   {
//     questionText: "hiiiiiiiiiiiiiiiii",
//     options: ["1111", "2222222222", "33333"],
//     correctOption: "",
//   },
//   {
//     questionText: "biiiiiiiiiiiiiiiiiiii",
//     options: ["4444444", "5555555555555"],
//     correctOption: "",
//   },
// ];

// const App = () => {
//   return (
//     <div className="p-6">

//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "@/components/form-editor/question-card"; // Adjust import path if necessary
import QuestionView from "@/components/form-view/question-view";

const FormViewPage = () => {
  const navigate = useNavigate();

  const [questionCards, setQuestionCards] = useState([{ id: 0, data: {} }]);

  // Add a new question card
  const handleAddQuestion = () => {
    setQuestionCards([
      ...questionCards,
      { id: questionCards.length, data: {} },
    ]);
  };

  // Remove a question card
  const handleRemoveQuestion = (id) => {
    setQuestionCards(questionCards.filter((card) => card.id !== id));
  };

  // Update question data for a specific card
  const handleQuestionDataChange = (id, data) => {
    const updatedCards = questionCards.map((card) =>
      card.id === id ? { ...card, data } : card
    );
    setQuestionCards(updatedCards);
  };

  // Log all question data
  const handleSave = () => {
    console.log(
      "All Question Data:",
      questionCards.map((card) => card.data)
    );
    alert("Questions saved!");
  };

  const handleCancel = () => {
    setQuestionCards([]); // Reset to one default card
  };

  const handleNavigate = () => {
    navigate("/view");
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Question Management</h1>
          <div className="space-x-4">
            <button
              onClick={handleAddQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add Question
            </button>
            <button
              onClick={() => {
                handleSave(); // Call the save function
                handleNavigate(); // Call the navigate function
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-3/4 flex-grow container mx-auto py-6 space-y-6">
        {questionCards.map((card, index) => (
          <div
            key={card.id}
            className="relative border rounded-lg p-4 shadow-md"
          >
            <QuestionView />
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} Question Management System</p>
      </footer>
    </div>
  );
};

export default FormViewPage;

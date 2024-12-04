import React, { useState } from "react";
import QuestionCard from "@/components/form-editor/question-card"; // Adjust import path if necessary

const FormBuilderPage = () => {
  const [questionCards, setQuestionCards] = useState([{ id: 0 }]);

  const handleAddQuestion = () => {
    setQuestionCards([...questionCards, { id: questionCards.length }]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestionCards(questionCards.filter((card) => card.id !== id));
  };

  const handleSave = () => {
    alert("Questions saved!");
  };

  const handleCancel = () => {
    setQuestionCards([{ id: 0 }]); // Reset to one default card
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
              onClick={handleSave}
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
            {/* Question Number */}
            <h2 className="absolute -top-3 -left-3 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {index + 1}
            </h2>
            {/* Remove Button */}
            <button
              onClick={() => handleRemoveQuestion(card.id)}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <QuestionCard />
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

export default FormBuilderPage;

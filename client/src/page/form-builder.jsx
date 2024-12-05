import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "@/components/form-editor/question-card"; // Adjust import path if necessary

const FormBuilderPage = () => {
  const navigate = useNavigate();

  // State to track question cards and next unique ID
  const [questionCards, setQuestionCards] = useState([{ id: 1, data: {} }]);
  const [nextQuestionId, setNextQuestionId] = useState(2); // Start IDs from 2 since the first question has ID 1

  // Add a new question card with a unique ID
  const handleAddQuestion = () => {
    setQuestionCards([...questionCards, { id: nextQuestionId, data: {} }]);
    setNextQuestionId(nextQuestionId + 1); // Increment the next ID
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

  // Save question data to MongoDB through the server
  const handleSave = async () => {
    try {
      const payload = {
        questions: questionCards.map((card, index) => ({
          questionId: card.id || index + 1,
          title: card.data.title,
          questionType: card.data.questionType || "None",
          mediaType: card.data.mediaType || "None",
          points: card.data.points || 0,
          picture: card.data.picture || "",
          description: card.data.description || "",
          categorizeData: card.data.categorizeData || {
            categories: [],
            items: [],
          },
          clozeData: card.data.clozeData || {
            sentence: [],
            options: [],
            feedback: [],
          },
          compData: card.data.compData || [],
          answers: card.data.answers || [],
        })),
      };

      console.log("Payload to be sent:", payload);

      const response = await fetch("http://localhost:3000/api/save-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Questions saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Save failed:", errorData);
        alert("Failed to save questions.");
      }
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("An error occurred while saving questions.");
    }
  };

  const handleNavigate = () => {
    handleSave(); // Save data before navigating
    navigate("/view");
  };

  const handleCancel = () => {
    setQuestionCards([{ id: 1, data: {} }]); // Reset to the initial default card
    setNextQuestionId(2); // Reset the next ID
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
              onClick={handleNavigate}
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
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center pb-1"
            >
              &times;
            </button>
            <QuestionCard
              questionId={card.id} // Pass the unique ID to the QuestionCard
              onDataChange={(data) => handleQuestionDataChange(card.id, data)}
            />
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

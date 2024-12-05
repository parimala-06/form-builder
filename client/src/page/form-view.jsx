import React, { useState, useEffect } from "react";
import QuestionView from "@/components/form-view/question-view";

const FormViewPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/questions");
        const data = await response.json();
        if (response.ok) {
          setQuestions(data.questions); // Set questions data
        } else {
          console.error("Failed to fetch questions:", data.message);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p>Loading questions...</p>; // Display loading spinner or text
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Question Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-3/4 flex-grow container mx-auto py-6 space-y-6">
        <QuestionView questions={questions} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} Question Management System</p>
      </footer>
    </div>
  );
};

export default FormViewPage;

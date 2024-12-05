import React, { useState } from "react";

const CompView = ({ compData }) => {
  const [selectedOptions, setSelectedOptions] = useState({}); // Track selected options for each question

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    console.log(`Question "${questionId}" selected option: "${option}"`);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Comprehension Questions</h1>
      {compData.map((question, index) => (
        <div
          key={`question-${index}`}
          className="border rounded-lg shadow-md p-4 bg-white"
        >
          <h2 className="text-lg font-semibold mb-2">
            {question.questionText}
          </h2>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <label
                key={`option-${optionIndex}`}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={selectedOptions[`question-${index}`] === option}
                  onChange={() =>
                    handleOptionChange(`question-${index}`, option)
                  }
                  className="shadcn-radio"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompView;

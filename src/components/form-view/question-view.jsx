import React from "react";
import CategorizeView from "@/components/form-view/categorize-view";
import ClozeView from "@/components/form-view/cloze-view";
import CompView from "@/components/form-view/comp-view";

const DynamicQuestionView = ({ questions }) => {
  return (
    <div className="p-6">
      {questions.map((question, index) => {
        const {
          questionType,
          mediaType,
          points,
          title,
          description,
          categorizeData,
          clozeData,
          compData,
        } = question;

        return (
          <div
            key={`question-${index}`}
            className="border rounded-lg shadow-md p-4 mb-4 bg-white"
          >
            {/* Question Header */}
            <div className="flex flex-col justify-between  mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm w-[90%]">
                  Question {index + 1}
                </h3>
                <h3 className="font-semibold text-sm">
                  {points && `${points} points`}
                </h3>
              </div>
              <p className="text-lg font-semibold mt-2">{title}</p>
              <p className="text-sm text-gray-600 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias ipsam voluptate possimus in quidem non optio, rerum a
                maiores, quo reiciendis, eveniet soluta laborum voluptatibus.
                Amet voluptatum doloribus id dignissimos.
                {description}
              </p>
            </div>

            {/* Media Handling */}
            {mediaType === "Image" && (
              <div className="flex justify-center items-center">
                <img
                  src="https://via.placeholder.com/150" // Replace with actual image URL from your JSON
                  alt="question media"
                  className="mb-4 w-auto h-40"
                />
              </div>
            )}

            {/* Render the question component based on the questionType */}
            {questionType === "Categorize" && categorizeData && (
              <CategorizeView categorizeData={categorizeData} />
            )}
            {questionType === "Cloze" && clozeData && (
              <ClozeView clozeData={clozeData} />
            )}
            {questionType === "Comprehension" && compData && (
              <CompView compData={compData} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const QuestionView = () => {
  const questionsJson = [
    {
      questionType: "Categorize",
      mediaType: "None",
      points: "10",
      title: "title1",
      description: "here mucis",
      categorizeData: {
        categories: ["hi", "he"],
        groupedItems: {
          hi: ["somthing"],
          he: ["item", "nothing"],
        },
      },
      clozeData: {
        sentence: [],
        options: [],
        feedback: [],
      },
      compData: [],
    },
    {
      questionType: "Cloze",
      mediaType: "Image",
      points: "20",
      title: "Snfd,m,",
      description: "a;woreuanik f",
      categorizeData: {
        categories: [],
        items: [],
      },
      clozeData: {
        sentence: "WPRIKLNFD ;<u>wSODIKJNF</u> SEPFIN",
        options: [
          { id: "option-1", content: "asodljjnd" },
          { id: "option-0", content: "wSODIKJNF" },
          { id: "option-2", content: "dsfonu ejf" },
        ],
        feedback: "feedbackkk",
      },
      compData: [],
    },
  ];

  return <DynamicQuestionView questions={questionsJson} />;
};

export default QuestionView;

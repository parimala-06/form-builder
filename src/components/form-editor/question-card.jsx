import React, { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Categorize from "./catogorize";
import Cloze from "./cloze";
import Comprehension from "./comprehension";

const QuestionCard = () => {
  const [questionType, setQuestionType] = useState("None");
  const [mediaType, setMediaType] = useState("None");
  const [points, setPoints] = useState("");
  const [picture, setPicture] = useState("");
  const [categorizeData, setCategorizeData] = useState({
    categories: [],
    items: [],
  });
  const [clozeData, setClozeData] = useState({
    sentence: [],
    options: [],
    feedback: [],
  });

  // Handle changes for the dropdown (question type)
  const handleQuestionTypeChange = (value) => {
    setQuestionType(value);
  };

  const handleMediaTypeChange = (value) => {
    setMediaType(value);
  };

  const handleImageChange = (e) => {
    setPicture(e.target.value);
  };

  // Handle changes for the points input
  const handlePointsChange = (e) => {
    setPoints(e.target.value);
  };
  const logData = () => {
    console.log({
      questionType,
      mediaType,
      points,
      title,
      description,
      categorizeData,
      clozeData,
    });
  };

  return (
    <Card className="w-full p-6">
      <h2 className="text-xl font-bold mb-4">Question</h2>

      {/* Question Type Dropdown */}
      <div className="flex justify-evenly mb-4 gap-5">
        <div className="w-1/3">
          <Label className="block text-sm font-medium text-gray-700">
            Question Type
          </Label>
          <Select value={questionType} onValueChange={handleQuestionTypeChange}>
            <SelectTrigger className="mt-1 w-full p-2 border border-gray-300 rounded-md">
              {questionType}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Categorize">Categorize</SelectItem>
              <SelectItem value="Cloze">Cloze</SelectItem>
              <SelectItem value="Comprehension">Comprehension</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/3">
          <Label className="block text-sm font-medium text-gray-700">
            Media Type
          </Label>
          <Select value={mediaType} onValueChange={handleMediaTypeChange}>
            <SelectTrigger className="mt-1 w-full p-2 border border-gray-300 rounded-md">
              {mediaType}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Points Input */}
        <div className="w-1/3">
          <Label
            htmlFor="points"
            className="block text-sm font-medium text-gray-700"
          >
            Points
          </Label>
          <Input
            id="points"
            type="number"
            value={points}
            onChange={handlePointsChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {
        /* Image Upload Field */
        mediaType === "Image" ? (
          <>
            <div className="mb-4">
              <Label
                htmlFor="picture"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image here
              </Label>
              <Input
                id="picture"
                type="file"
                value={picture}
                onChange={handleImageChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        ) : (
          <></>
        )
      }

      {/* Title Input */}
      <div className="mb-4">
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <Input
          id="title"
          rows="4"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter the Title here..."
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          {questionType === "Comprehension"
            ? `Comprehension Passage`
            : `Description`}
        </Label>
        <Textarea
          id="description"
          rows="4"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter the question description here..."
        ></Textarea>
      </div>
      {questionType === "Categorize" ? (
        <Categorize onCategorizeChange={setCategorizeData} />
      ) : questionType === "Cloze" ? (
        <Cloze onClozeChange={setClozeData} />
      ) : questionType === "Comprehension" ? (
        <Comprehension />
      ) : (
        <div className="text-center ">Choose a question type</div>
      )}
      <Button onClick={logData}>Log Question Data</Button>
    </Card>
  );
};

export default QuestionCard;

const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
  {
    questionIndex: {
      type: Number,
      required: true,
    },
    questionType: {
      type: String,
      enum: ["Categorize", "Cloze", "Comprehension"],
      required: true,
    },
    // Flexible answer fields
    categoryAnswer: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    blank: {
      type: String,
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
    optionChosen: {
      type: String,
      required: false,
    },
  },
  { _id: false }
); // Prevent creating additional _id for subdocuments

const QuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true,
      unique: true,
    },
    questionType: {
      type: String,
      enum: ["None", "Categorize", "Cloze", "Comprehension"],
      default: "None",
    },
    mediaType: {
      type: String,
      enum: ["None", "Image"],
      default: "None",
    },
    points: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
    },
    picture: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    categorizeData: {
      categories: [String],
      groupedItems: {
        type: Map,
        of: [String],
        default: {},
      },
    },
    clozeData: {
      sentence: [String],
      options: [
        {
          id: { type: String, required: true },
          content: { type: String, required: true },
        },
      ],
      feedback: [String],
    },
    compData: [
      {
        questionText: {
          type: String,
          required: true,
        },
        options: [String],
        correctOption: {
          type: String,
          default: null,
        },
      },
    ],
    answers: [AnswerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);

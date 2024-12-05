// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(
//     "mongodb+srv://baratraajcr19:tyUKn6kvsqEpGGQq@questions-db.63tqh.mongodb.net/?retryWrites=true&w=majority&appName=questions-db"
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });

// const Question = require("../server/model/question-model");

// // Sample route to test the server
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your front-end URL
  })
);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://baratraajcr19:tyUKn6kvsqEpGGQq@questions-db.63tqh.mongodb.net/?retryWrites=true&w=majority&appName=questions-db"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Import Question model
const Question = require("../server/model/question-model"); // Ensure correct path

// Sample route to test the server
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Route to handle saving questions
app.post("/api/save-questions", async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid input: questions array is required." });
    }

    console.log("Questions to be saved:", questions);

    // Use upsert to handle duplicates
    const operations = questions.map((question) => ({
      updateOne: {
        filter: { questionId: question.questionId },
        update: { $set: question },
        upsert: true, // Create a new document if it doesn't exist
      },
    }));

    const result = await Question.bulkWrite(operations);

    res.status(201).json({ message: "Questions saved successfully", result });
  } catch (error) {
    console.error("Error saving questions:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate key error",
        error: error.keyValue,
      });
    }

    res
      .status(500)
      .json({ message: "Error saving questions", error: error.message });
  }
});

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch all questions
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

app.patch("/api/questions", async (req, res) => {
  try {
    const updates = req.body; // Array of { questionId, answers } objects

    if (!Array.isArray(updates) || updates.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid input: Provide an array of updates." });
    }

    // Use a Promise.all to handle multiple updates
    const updatePromises = updates.map(({ questionId, answers }) => {
      if (!questionId || !Array.isArray(answers)) {
        throw new Error(
          "Each update must have a valid 'questionId' and 'answers' array."
        );
      }

      // Process answers to handle different types
      const processedAnswers = answers.map((answer) => {
        // Handle category answer if it's a string (from JSON.stringify)
        if (
          answer.categoryAnswer &&
          typeof answer.categoryAnswer === "string"
        ) {
          try {
            answer.categoryAnswer = JSON.parse(answer.categoryAnswer);
          } catch (parseError) {
            console.warn(
              `Could not parse categoryAnswer: ${parseError.message}`
            );
          }
        }
        return answer;
      });

      return Question.findOneAndUpdate(
        { questionId }, // Match question by questionId
        {
          $set: {
            answers: processedAnswers,
          },
        }, // Update the answers field
        {
          new: true,
          runValidators: true,
          strict: "throw", // Ensure schema validation
        }
      );
    });

    const updatedQuestions = await Promise.all(updatePromises);

    res.status(200).json({
      message: "Questions updated successfully.",
      updatedQuestions,
    });
  } catch (error) {
    console.error("Error updating questions:", error.message);
    res.status(500).json({
      message: "Error updating questions",
      error: error.message,
      details: error.toString(),
    });
  }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

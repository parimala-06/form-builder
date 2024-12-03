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

const Categorize = () => {
  const [questionType, setQuestionType] = useState("Categorize");
  const [mediaType, setMediaType] = useState("None");
  const [points, setPoints] = useState("");
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);

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

  // Handle category input changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Add category to the list
  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory(""); // Clear the input field after adding
    }
  };

  // Remove a category
  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  // Handle item name input
  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  // Add item with category
  const handleAddItem = () => {
    if (itemName && categories.length > 0) {
      setItems([...items, { name: itemName, category: "" }]);
      setItemName(""); // Clear input field after adding
    }
  };

  // Handle item category change
  const handleItemCategoryChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].category = value;
    setItems(updatedItems);
  };

  // Remove a category
  const handleRemoveItem = (itemToRemove) => {
    setItems(items.filter((item) => item !== itemToRemove));
  };

  return (
    <Card className="w-3/4 p-6">
      <h2 className="text-xl font-bold mb-4">Categorize Question</h2>

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

      {/* Description Input */}
      <div className="mb-4">
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Textarea
          id="description"
          rows="4"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter the question description here..."
        ></Textarea>
      </div>

      {/* Category Input */}
      <div className="mb-4">
        <Label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id="category"
            type="text"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter category name"
          />
          <Button
            type="button"
            onClick={handleAddCategory}
            className="bg-blue-500 text-white"
          >
            Add Category
          </Button>
        </div>
      </div>

      {/* List of Added Categories as Tabs with Remover */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Added Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex justify-evenly items-center space-x-2 bg-gray-200 rounded-full px-4 py-1 text-gray-700"
              >
                <span>{cat}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCategory(cat)}
                  className="text-red-500"
                >
                  <span className="text-xl">×</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items Input Section */}
      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-700 mb-1">
          Items
        </Label>
        <div className="flex space-x-2 mb-4 items-center ">
          <Input
            id="itemName"
            type="text"
            value={itemName}
            onChange={handleItemNameChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter item name"
          />
          <Button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 text-white"
          >
            Add Item
          </Button>
        </div>

        {/* Display Items and Their Assigned Categories */}
        {items.length > 0 && (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Input
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  value={item.name}
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].name = e.target.value;
                    setItems(updatedItems);
                  }}
                />
                <Select
                  value={item.category}
                  onValueChange={(value) =>
                    handleItemCategoryChange(index, value)
                  }
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                >
                  <SelectTrigger>
                    {item.category || "Select Category"}
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat, catIndex) => (
                      <SelectItem key={catIndex} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500"
                >
                  <span className="text-xl mb-2">×</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Categorize;

// import React, { useState } from "react";
// import {
//   DndContext,
//   useDraggable,
//   useDroppable,
//   closestCenter,
// } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";

// const DraggableBadge = ({ id, label }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//   });

//   const style = {
//     transform: CSS.Translate.toString(transform),
//   };

//   return (
//     <span
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer shadow-md"
//     >
//       {label}
//     </span>
//   );
// };

// const DroppableRectangle = ({ id, category, items, onDrop }) => {
//   const { setNodeRef } = useDroppable({
//     id,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       className="flex flex-col items-center p-4 border-2 border-gray-400 rounded-md min-w-[200px] min-h-[200px]"
//     >
//       <h2 className="font-bold text-lg mb-2">{category}</h2>
//       <div className="flex flex-wrap gap-2">
//         {items.map((item) => (
//           <DraggableBadge key={item.id} id={item.id} label={item.label} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const CategorizePreview = ({ data }) => {
//   const [categories, setCategories] = useState(data);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (!over) return;

//     const sourceCategory = categories.find((cat) =>
//       cat.items.some((item) => item.id === active.id)
//     );
//     const destinationCategory = categories.find((cat) => cat.id === over.id);

//     if (sourceCategory && destinationCategory) {
//       const draggedItem = sourceCategory.items.find(
//         (item) => item.id === active.id
//       );

//       setCategories((prevCategories) =>
//         prevCategories.map((cat) => {
//           if (cat.id === sourceCategory.id) {
//             return {
//               ...cat,
//               items: cat.items.filter((item) => item.id !== active.id),
//             };
//           }

//           if (cat.id === destinationCategory.id) {
//             return {
//               ...cat,
//               items: [...cat.items, draggedItem],
//             };
//           }

//           return cat;
//         })
//       );
//     }
//   };

//   return (
//     <DndContext
//       onDragEnd={handleDragEnd}
//       collisionDetection={closestCenter} // Use a simpler collision detection
//     >
//       <div className="flex flex-wrap gap-4">
//         {categories.map((category) => (
//           <DroppableRectangle
//             key={category.id}
//             id={category.id}
//             category={category.name}
//             items={category.items}
//           />
//         ))}
//       </div>
//       <div className="mt-4">
//         <h2 className="font-bold text-lg">Available Items</h2>
//         <div className="flex flex-wrap gap-2">
//           {categories
//             .flatMap((category) => category.items)
//             .map((item) => (
//               <DraggableBadge key={item.id} id={item.id} label={item.label} />
//             ))}
//         </div>
//       </div>
//     </DndContext>
//   );
// };

// export default CategorizePreview;

// import React from "react";
// import {
//   DndContext,
//   useDraggable,
//   useDroppable,
//   closestCenter,
// } from "@dnd-kit/core";

// const DraggableItem = ({ id, children }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id,
//   });

//   const style = {
//     transform: transform
//       ? `translate(${transform.x}px, ${transform.y}px)`
//       : undefined,
//     padding: "10px",
//     margin: "5px",
//     border: "1px solid #ccc",
//     backgroundColor: "#f0f0f0",
//     cursor: "grab",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {children}
//     </div>
//   );
// };

// const DroppableContainer = ({ id, children, onDrop }) => {
//   const { isOver, setNodeRef } = useDroppable({
//     id,
//   });

//   const style = {
//     border: "2px dashed #ccc",
//     backgroundColor: isOver ? "#e0ffe0" : "#fff",
//     padding: "20px",
//     minHeight: "100px",
//     width: "150px",
//     margin: "10px",
//     textAlign: "center",
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {children}
//     </div>
//   );
// };

// const CatergorizeView = () => {
//   const items = [
//     { id: "Japan", type: "Country" },
//     { id: "Paris", type: "City" },
//     { id: "USA", type: "Country" },
//     { id: "Madrid", type: "City" },
//   ];

//   const [placements, setPlacements] = React.useState({
//     Country: [],
//     City: [],
//   });

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (over) {
//       const newPlacements = { ...placements };
//       const category = over.id;

//       // Avoid duplicate placements
//       if (!newPlacements[category].includes(active.id)) {
//         newPlacements[category] = [...newPlacements[category], active.id];
//         setPlacements(newPlacements);
//         console.log(`Placed "${active.id}" in "${category}"`);
//       }
//     }
//   };

//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <h1>Categorize the Following</h1>
//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         {items.map((item) => (
//           <DraggableItem key={item.id} id={item.id}>
//             {item.id}
//           </DraggableItem>
//         ))}
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-around" }}>
//         <DroppableContainer id="Country">
//           <h3>Country</h3>
//           {placements.Country.map((item) => (
//             <div key={item}>{item}</div>
//           ))}
//         </DroppableContainer>
//         <DroppableContainer id="City">
//           <h3>City</h3>
//           {placements.City.map((item) => (
//             <div key={item}>{item}</div>
//           ))}
//         </DroppableContainer>
//       </div>
//     </DndContext>
//   );
// };

// export default CatergorizeView;

import React from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 m-2 text-white bg-blue-500 rounded-md cursor-pointer shadow-md hover:bg-blue-600"
    >
      {children}
    </div>
  );
};

const DroppableContainer = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const containerStyle = isOver
    ? "bg-green-100 border-green-400"
    : "bg-gray-100 border-gray-300";

  return (
    <div
      ref={setNodeRef}
      className={`border-2 ${containerStyle} rounded-lg p-4 min-h-[150px] w-56 flex flex-col items-center space-y-2 shadow-md`}
    >
      <h3 className="text-lg font-bold text-gray-700 capitalize">{id}</h3>
      {children}
    </div>
  );
};

const CategorizeView = ({ categorizeData, onCategorizationChange }) => {
  const { categories, groupedItems } = categorizeData;

  const [placements, setPlacements] = React.useState(
    categories.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {})
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const newPlacements = { ...placements }; // Copy the current placements

      const category = over.id;

      // Ensure the category exists in newPlacements
      if (!newPlacements[category]) {
        newPlacements[category] = [];
      }

      // Avoid duplicate placements
      if (!newPlacements[category].includes(active.id)) {
        newPlacements[category].push(active.id); // Append the item
        setPlacements(newPlacements); // Update the state
        console.log(`Placed "${active.id}" in "${category}"`);
      }
    }

    // Now pass the updated placements to the parent component
    onCategorizationChange(placements); // You should use newPlacements here instead of placements

    console.log("Updated placements:", placements);
  };

  const allItems = Object.entries(groupedItems).flatMap(([category, items]) =>
    items.map((item) => ({ id: item, category }))
  );

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {allItems.map((item) => (
          <DraggableItem key={item.id} id={item.id}>
            {item.id}
          </DraggableItem>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        {categories.map((category) => (
          <DroppableContainer key={category} id={category}>
            {placements[category].map((item) => (
              <div
                key={item}
                className="p-1 text-sm text-white bg-purple-500 rounded-md"
              >
                {item}
              </div>
            ))}
          </DroppableContainer>
        ))}
      </div>
    </DndContext>
  );
};

export default CategorizeView;

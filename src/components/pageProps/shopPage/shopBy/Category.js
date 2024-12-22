import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Category = ({ categories, setCategoryId, categoryId }) => {
  const [showCategories, setShowCategories] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState(null); // State to track the active category

  const handleCategoryClick = (id) => {
    setCategoryId(id); // Pass the selected category ID to the parent
    setActiveCategoryId(id); // Set the clicked category as active
  };

  return (
    <div className="w-full">
      <div
        onClick={() => setShowCategories(!showCategories)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Category" icons={true} />
      </div>
      {showCategories && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {categories.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => handleCategoryClick(id)}
                className={`border-b-[1px] cursor-pointer border-b-[#F0F0F0] py-1 px-2 flex items-center justify-between ${
                  (activeCategoryId === id && categoryId !== '')
                    ? "bg-gray-200 font-bold text-primeColor" // Styles for active item
                    : "hover:border-gray-400"
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Category;

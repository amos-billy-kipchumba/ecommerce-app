import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";

const Brand = ({ brands, setBrandId, brandId }) => {
  const [showBrands, setShowBrands] = useState(true);
  const [activeBrandId, setActiveBrandId] = useState(null); // State to track the active brand

  const handleBrandClick = (id) => {
    setBrandId(id); // Pass the selected brand ID to the parent
    setActiveBrandId(id); // Set the clicked brand as active
  };

  return (
    <div>
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Shop by Brand" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {brands.map((item) => (
              <li
                key={item.id}
                onClick={() => handleBrandClick(item.id)}
                className={`border-b-[1px] border-b-[#F0F0F0] cursor-pointer py-1 px-2 flex items-center gap-2 duration-300 ${
                  (activeBrandId === item.id && brandId !== '')
                    ? "bg-gray-200 font-bold text-primeColor" // Active styles
                    : "hover:text-primeColor hover:border-gray-400"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;

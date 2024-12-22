import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";

const ShopSideNav = ({categories, brands, brandId, categoryId, setCategoryId, setBrandId}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} categories={categories} categoryId={categoryId} setCategoryId={setCategoryId} />
      <Brand brands={brands} brandId={brandId} setBrandId={setBrandId} />
    </div>
  );
};

export default ShopSideNav;

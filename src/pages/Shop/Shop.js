import React, {useEffect, useState} from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import api from "../../Api";
import { toast } from 'react-hot-toast';

const Shop = () => {

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')

  useEffect(()=>{
    const getCategories = async () => {
      try {
        let response = await api.read('/all-categories');
        if (response) {
          setCategories(response)
        } else {
          toast.error("Failure to get categories"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const getBrands = async () => {
      try {
        let response = await api.read('/all-brands');
        if (response) {
          setBrands(response)
        } else {
          toast.error("Failure to get brands"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    getCategories()
    getBrands()
  },[])

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav brandId={brandId} categoryId={categoryId} categories={categories} brands={brands} setCategoryId={setCategoryId} setBrandId={setBrandId} />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <button 
          onClick={()=>{
            setCategoryId('')
            setBrandId('')
          }}
          className="ml-auto bg-black text-white px-8 py-2 border border-black hover:bg-white hover:text-black">
            Reset Filter
          </button>
          <Pagination brandId={brandId} categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default Shop;

import React, { useState, useEffect } from 'react';
import { Search, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../../Api';
import { toast } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
import BaseUrl from '../../../BaseUrl';

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getData = async (page) => {
      try {
        let response = await api.read(`/products?page=${page}&query=${searchQuery}`);
        if (response.data) {
          setProducts(response.data)
          setPageCount(response.last_page);
          setTotalItems(response.total);
        } else {
          toast.error("Failure to get data"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    getData(1);
  }, [searchQuery]);

  const handlePageClick = (event) => {
    const fetchProducts = async (page) => {
      try {
        let response = await api.read(`/products?page=${page}&query=${searchQuery}`);
        if (response.data) {
          setProducts(response.data)
          setPageCount(response.last_page);
          setTotalItems(response.total);
        } else {
          toast.error("Failure to get data"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };
    const selectedPage = event.selected + 1;
    fetchProducts(selectedPage);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        toast.success('Product deleted successfully');
        // Refresh the product list
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      } catch (error) {
        toast.error('Error deleting product: ' + error);
      }
    }
  };

  useEffect(() => {
    if(searchQuery !== ""){
      const getData = async () => {
        try {
          let response = await api.search(`/search/product?searchTerm=${searchQuery}`);
          if (response) {
            setProducts(response)
          } else {
            toast.error("Failure to get products"); 
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };
  
      getData()
    }
  }, [searchQuery]);

  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  },[]);

  return (
    <div className="max-w-8xl min-h-full pt-28 mx-auto p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-slate-200 text-left">
          <h2 className="text-2xl font-bold text-slate-800">Products</h2>
          <p className="text-sm text-slate-500 mt-1">Overview of all products</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full h-10 pl-4 pr-12 text-sm border rounded-lg focus:outline-none focus:border-slate-400 border-slate-200"
                placeholder="Search products..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Image</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Stock</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Brand</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">
                        <img src={`${BaseUrl}/images/${product.image}`} className='my-auto w-12' alt="" />
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{product.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{product.price}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{product.stock}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{product.category?.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{product.brand?.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/products/${product.id}/edit`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit Product"
                        >
                          <Pencil className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
              <ReactPaginate
                nextLabel="Next"
                previousLabel="Previous"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                pageClassName=""
                containerClassName="flex text-base flex items-center font-semibold font-titleFont gap-4 py-10"
                activeClassName="bg-black text-white"
              />
              <p className="text-base font-normal text-lightText ml-4">
                Showing {products.length} of {totalItems} products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
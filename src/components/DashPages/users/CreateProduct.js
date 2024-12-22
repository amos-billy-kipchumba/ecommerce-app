import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import api from '../../../Api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const CreateProduct = () => {
  const initialFormData = {
    name: '',
    category_id: '',
    brand_id: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch categories and brands
  useEffect(() => {
    const getData = async () => {
        try {
          let response = await api.read(`/all-brands`);
          if (response) {
              setBrands(response)
          } else {
            toast.error("Failure to get data"); 
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };

      const getCategories = async () => {
        try {
          let response = await api.read(`/all-categories`);
          if (response) {
              setCategories(response)
          } else {
            toast.error("Failure to get data"); 
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };
  
  
      getData();
      getCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'Category is required';
    }
    if (!formData.brand_id) {
      newErrors.brand_id = 'Brand is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      try {
        const response = await api.create('/products', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.message === 'Product added successfully') {
          toast.success(response.message);
          navigate('/products');
        }
        setFormData(initialFormData);
      } catch (error) {
        console.error('Submission error:', error);
        toast.error('Failed to create product');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const categoryOptions = categories.map((data) => ({
    value: data.id,
    label: data.name,
  }));

  const brandOptions = brands.map((data) => ({
    value: data.id,
    label: data.name,
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-full bg-gray-50 min-h-full pt-28 p-4">
      <div className="bg-white rounded-lg shadow max-w-4xl">
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col gap-4 lg:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Create Product</h2>
              <p className="text-sm text-slate-500">Add a new product to the system</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFormData(initialFormData)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
              Clear
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Create Product'}
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-left">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm ${
                  errors.name ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                }`}
              />

              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>

              <Select
                    id="category_id"
                    name="category_id"
                    value={categoryOptions.find((option) => option.value === formData.category_id) || null}
                    onChange={handleSelectChange}
                    options={categoryOptions}
                    placeholder="Select Category"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                />
              {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>

              <Select
                    id="brand_id"
                    name="brand_id"
                    value={brandOptions.find((option) => option.value === formData.brand_id) || null}
                    onChange={handleSelectChange}
                    options={brandOptions}
                    placeholder="Select Brand"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                />
              {errors.brand_id && <p className="text-red-500 text-sm">{errors.brand_id}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full px-3 py-2 border rounded-lg shadow-sm ${
                  errors.description ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm ${
                    errors.price ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                  }`}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm ${
                    errors.stock ? 'border-red-300 focus:ring-red-500' : 'border-slate-300 focus:ring-slate-500'
                  }`}
                />
                {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm border-slate-300 focus:ring-slate-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
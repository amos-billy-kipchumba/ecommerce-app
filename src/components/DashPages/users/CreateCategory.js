import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import api from '../../../Api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const initialFormData = {
    name: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await api.create('/categories', formData);
        if(response.message === "Category added") {
            toast.success(response.message)
            navigate('/categories')
        }
        setFormData(initialFormData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    },[]);

    
  return (
    <div className="max-w-full bg-gray-50 min-h-full pt-28 p-4">
      <div className="bg-white rounded-lg shadow max-w-4xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col gap-4 lg:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()} 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Create Category</h2>
              <p className="text-sm text-slate-500">Add a new category to the system</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFormData(initialFormData)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              disabled={isSubmitting}
            >
              <span className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Clear
              </span>
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              disabled={isSubmitting}
            >
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : 'Create Category'}
              </span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 text-left">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-slate-300 focus:ring-slate-500'
                }`}
                placeholder="Enter category name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
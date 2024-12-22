import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import api from "../../Api";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, password, phone, name } = formData;

    if (!name.trim()) newErrors.name = "Enter your name";
    if (!email.trim()) newErrors.email = "Enter your email";
    if (!phone.trim()) newErrors.phone = "Enter your phone";
    if (!password.trim()) newErrors.password = "Enter your password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.create("/register", formData);
      
      if (response.user) {
        toast.success("Registration successful!");
        navigate("/signin");
      }
      if(response.errors) {
        toast.error(response.errors[0])
      }

    } catch (error) {
      setErrors(error.errors);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28 bg-white" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          {/* Features section */}
          {[
            {
              title: "Get started fast with E-SHOP",
              description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!"
            },
            {
              title: "Access all E-SHOP services",
              description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!"
            },
            {
              title: "Trusted by online Shoppers",
              description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor recusandae consectetur!"
            }
          ].map((feature, index) => (
            <div key={index} className="w-[300px] flex items-start gap-3">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  {feature.title}
                </span>
                <br />
                {feature.description}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between mt-10">
            {["© E-SHOP", "Terms", "Privacy", "Security"].map((item, index) => (
              <p key={index} className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="w-full lgl:w-[450px] my-auto px-6 py-4">
          <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
          <div className="flex flex-col gap-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Email", name: "email", type: "email" }
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md outline-none"
                  placeholder={field.label.toLowerCase()}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md outline-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md ${
                loading ? "bg-gray-400" : "bg-primeColor hover:bg-black text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, MapPin } from "lucide-react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "../Cart/ItemCard";
import api from "../../Api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useUser } from "../../context/UserContext";

const Payment = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useUser();
  
  const [formData, setFormData] = useState({
    // User details
    name: "",
    email: "",
    phone: "",
    password: '',
    // Location details
    street: "",
    building: "",
    area: "",
    order_items: products ?? null,
    total_price: 0,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    setFormData(prev => ({
      ...prev,
      total_price: totalAmt + shippingCharge
    }));

    try {
      const response = await api.create("/make-order", formData);
      
      if (response.message === "order added") {
        toast.success("Order made successful!");

        try {
          const response = await api.login("/login", formData);
    
          if (response.user) {
            const user = {
              id:response.user?.id,
              name: response.user?.email,
              phone: response.user?.phone,
              role_id: response.user?.role_id
            };
    
            updateUser(user);
            localStorage.setItem("token", response.access_token);
    
            navigate("/dashboard");
          }
        } catch (error) {
          toast.error("Login failed. Please check your credentials.");
        } finally {
        }
      }
      if(response.errors) {
        toast.error(response.errors[0])
      }

    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const FormSection = ({ icon: Icon, title, children }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InputField = ({ label, name, type = "text", placeholder, required = true }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Cart items */}
          <div className="col-span-3 lg:col-span-2 px-4">
            {/* Existing cart content */}
            {products.length > 0 ? (
              <div className="pb-20">
                <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
                  <h2 className="col-span-2">Product</h2>
                  <h2>Price</h2>
                  <h2>Quantity</h2>
                  <h2>Sub Total</h2>
                </div>
                <div className="mt-5">
                  {products.map((item) => (
                    <div key={item._id}>
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
                {/* Cart totals and reset button */}
                <button
                  onClick={() => dispatch(resetCart())}
                  className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
                >
                  Reset cart
                </button>
                <div className="max-w-7xl gap-4 flex justify-end mt-4">
                  <div className="w-96 flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
                    <div>
                      <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 lg:text-lg px-4 font-medium">
                        Subtotal
                        <span className="font-semibold tracking-wide font-titleFont">
                          ${totalAmt}
                        </span>
                      </p>
                      <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                        Shipping Charge
                        <span className="font-semibold tracking-wide font-titleFont">
                          ${shippingCharge}
                        </span>
                      </p>
                      <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 lg:text-lg px-4 font-medium">
                        Total
                        <span className="font-bold tracking-wide text-lg font-titleFont">
                          ${totalAmt + shippingCharge}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
              >
                <div>
                  <img
                    className="w-80 rounded-lg p-4 mx-auto"
                    src={emptyCart}
                    alt="emptyCart"
                  />
                </div>
                <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                  <h1 className="font-titleFont text-xl font-bold uppercase">
                    Your Cart feels lonely.
                  </h1>
                  <p className="text-sm text-center px-10 -mt-2">
                    Your Shopping cart lives to serve. Give it purpose - fill it with
                    books, electronics, videos, etc. and make it happy.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right side - Payment Form */}
          <div className="col-span-3 lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <FormSection icon={User} title="Personal Information">
                <InputField label="Full Name" name="name" placeholder="John Doe" />
                <InputField label="Email" name="email" type="email" placeholder="john@example.com" />
                <InputField label="Phone" name="phone" placeholder="+1234567890" />
              </FormSection>

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
              </div>

              <FormSection icon={MapPin} title="Delivery Location">
                <InputField label="Street" name="street" placeholder="123 Main St" />
                <InputField label="Building" name="building" placeholder="Apt 4B" />
                <InputField label="Area" name="area" placeholder="Downtown" />
              </FormSection>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
              >
               {loading ? "Loading..." : `Pay ${totalAmt + shippingCharge} on delivery`} 
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
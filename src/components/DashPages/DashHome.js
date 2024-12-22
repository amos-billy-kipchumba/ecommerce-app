import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-hot-toast';
import api from "../../Api";
import DashImage from "../../assets/img/bg1.jpg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const DashHome = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const navigate = useNavigate()
  const {user} = useUser()

  useEffect(()=>{

    if(parseInt(user.role_id) !== 1){
      navigate('/orders')
    }

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    },[navigate, user.role_id]);

  const [lineChartData, setLineChartData] = useState([
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 0 },
    { name: 'Aug', value: 0 },
    { name: 'Sep', value: 0 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 }
  ]);


  const [barChartData, setBarChartData] = useState([
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 0 },
    { name: 'Aug', value: 0 },
    { name: 'Sep', value: 0 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 }
  ]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await api.read('/all-users');
        if (response.users) {
          setUsers(response.users);
          
          // Process users to count by month
          const userCountByMonth = response.users.reduce((acc, user) => {
            if (user.created_at) {
              const date = new Date(user.created_at);
              const monthIndex = date.getMonth(); // 0-11
              
              // Only count users from the current year
              if (date.getFullYear() === new Date().getFullYear()) {
                acc[monthIndex]++;
              }
            }
            return acc;
          }, new Array(12).fill(0));

          // Update lineChartData with the calculated monthly counts
          setLineChartData(prevData => 
            prevData.map((month, index) => ({
              ...month,
              value: userCountByMonth[index]
            }))
          );
        } else {
          toast.error("Failure to get users"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };


    const getOrders = async () => {
      try {
        let response = await api.read('/all-orders');
        if (response) {
          setOrders(response);
          
          // Process orders to count by month
          const orderCountByMonth = response.reduce((acc, order) => {
            if (order.created_at) {
              const date = new Date(order.created_at);
              const monthIndex = date.getMonth(); 
              
              // Only count users from the current year
              if (date.getFullYear() === new Date().getFullYear()) {
                acc[monthIndex]++;
              }
            }
            return acc;
          }, new Array(12).fill(0));

          setBarChartData(prevData => 
            prevData.map((month, index) => ({
              ...month,
              value: orderCountByMonth[index]
            }))
          );
        } else {
          toast.error("Failure to get orders"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const getProducts = async () => {
      try {
        let response = await api.read('/all-products');
        if (response) {
            setCurrencies(response)
        } else {
          toast.error("Failure to get products"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const getCategories = async () => {
      try {
        let response = await api.read('/all-categories');
        if (response) {
            setCommissions(response)
        } else {
          toast.error("Failure to get categories"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    

    getUsers();
    getOrders();
    getProducts();
    getCategories();
  }, []);




  return (
    <div className="w-full relative flex overflow-x-hidden">
      <div className="relative bg-gray-100 w-full">
        {/* Header Background Section */}
        <div 
          className="relative pt-32 pb-32 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${DashImage})` }}
        >
          <div className="px-4 md:px-6 mx-auto w-full">
            <div className="flex flex-wrap">
              {/* Traffic Card */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 z-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-gray-400 uppercase font-bold text-xs">
                          Orders
                        </h5>
                        <span className="font-bold text-xl">{orders.length}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                        👥
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Card */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 z-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-gray-400 uppercase font-bold text-xs">
                          CUSTOMERS
                        </h5>
                        <span className="font-bold text-xl">{users.length}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                          👥
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Card */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 z-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-gray-400 uppercase font-bold text-xs">
                          PRODUCTS
                        </h5>
                        <span className="font-bold text-xl">{currencies.length}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                          💰
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Card */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 z-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-gray-400 uppercase font-bold text-xs">
                          CATEGORIES
                        </h5>
                        <span className="font-bold text-xl">{commissions.length}</span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                          📈
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute top-0 w-full h-full bg-black/50"></div>
        </div>

        {/* Charts Section */}
        <div className="px-4 md:px-6 mx-auto w-full -mt-24">
          <div className="flex flex-wrap">
            {/* User Creation Line Chart */}
            <div className="w-full xl:w-8/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h6 className="uppercase mb-1 text-xs font-semibold text-gray-500">
                        Overview
                      </h6>
                      <h2 className="text-xl font-semibold text-gray-800">
                        Customers Created per Month
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#333" />
                        <YAxis stroke="#333" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#fecf0d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Orders Bar Chart */}
            <div className="w-full xl:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg bg-white">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h6 className="uppercase mb-1 text-xs font-semibold text-gray-500">
                        Overview
                      </h6>
                      <h2 className="text-xl font-semibold text-gray-800">
                      Orders Created per Month
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-auto">
                  <div className="relative h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#fecf0d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
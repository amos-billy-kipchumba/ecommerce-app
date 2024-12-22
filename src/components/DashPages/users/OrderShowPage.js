import React, { useState, useEffect } from 'react';
import api from '../../../Api';
import { toast } from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';

const OrderShowPage = () => {

  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const { id } = useParams();
  
  
  useEffect(() => {
    const getData = async () => {
      try {
        let response = await api.read(`/orders/${id}/items`);
        if (response) {
            setOrderItems(response)
        } else {
          toast.error("Failure to get data"); 
        }
      } catch (error) {
        toast.error('Error: ' + error);
      }
    };

    const getOrder = async () => {
        try {
          let response = await api.read(`/orders/${id}`);
          if (response) {
            setOrder(response)
          } else {
            toast.error("Failure to get data"); 
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };

    getData();
    getOrder();
  }, [id]);





  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    },[]);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
      
  return (
    <div className="max-w-8xl min-h-full pt-28 mx-auto p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-slate-200 text-left">
          <h2 className="text-2xl font-bold text-slate-800">Order items</h2>
          <p className="text-sm text-slate-500 mt-1">Overview of all orders items</p>
        </div>

        <div className="p-6">

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Quantity</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Created at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orderItems.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{order.product?.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.price}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.quantity}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.order?.status}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{formatDate(order.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            <div className="max-w-7xl gap-4 flex justify-end mt-4">
                <div className="w-96 flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold text-right">Total price</h1>
                    <div>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                        Number of items
                        <span className="font-semibold tracking-wide font-titleFont">
                        {orderItems.length}
                        </span>
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                        Delivery Date
                        <span className="font-semibold tracking-wide font-titleFont">
                        {order.date_of_delivery}
                        </span>
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                        Total charges including shipping
                        <span className="font-bold tracking-wide text-lg font-titleFont">
                        ${order.total_price}
                        </span>
                    </p>
                    </div>
                    <div className="flex justify-end">
                    <Link to="/orders">
                        <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                        Go back
                        </button>
                    </Link>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default OrderShowPage;
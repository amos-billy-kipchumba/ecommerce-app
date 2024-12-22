import React, { useState, useEffect } from 'react';
import { Search, Eye, Pen, Trash2 } from 'lucide-react';
import api from '../../../Api';
import { toast } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

const Orders = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const {user} = useUser()

  useEffect(() => {
    const getData = async (page) => {
      try {
        let response = await api.read(`/orders?page=${page}&query=${searchQuery}&id=${user.id}`);
        if (response.data) {
            setOrders(response.data)
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
  }, [searchQuery, user.id]);

  const handlePageClick = (event) => {
    const fetchProducts = async (page) => {
      try {
        let response = await api.read(`/orders?page=${page}&query=${searchQuery}&id=${user.id}`);
        if (response.data) {
            setOrders(response.data)
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

  useEffect(() => {

    if(searchQuery !== ""){
      const getData = async () => {
        try {
          let response = await api.read(`/search/order?searchTerm=${searchQuery}&id=${user.id}`);
          if (response.data) {
            setOrders(response.data)
          } else {
            toast.error("Failure to get orders"); 
          }
        } catch (error) {
          toast.error('Error: ' + error);
        }
      };
  
      getData()
    }

  }, [searchQuery, user.id]);

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

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
          try {
            await api.delete(`/orders/${orderId}`);
            toast.success('Order deleted successfully');
            // Refresh the order list
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
          } catch (error) {
            toast.error('Error deleting orders: ' + error);
          }
        }
      };
      
  return (
    <div className="max-w-8xl min-h-full pt-28 mx-auto p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-slate-200 text-left">
          <h2 className="text-2xl font-bold text-slate-800">Orders</h2>
          <p className="text-sm text-slate-500 mt-1">Overview of all orders</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full h-10 pl-4 pr-12 text-sm border rounded-lg focus:outline-none focus:border-slate-400 border-slate-200"
                placeholder="Search order status eg pending etc..."
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
                {user.role_id === 1 &&
                  <th className="px-6 py-4 font-medium">User</th>}
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total price</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium">Created at</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                     {user.role_id === 1 &&
                    <td className="px-6 py-4 font-medium text-slate-800">{order.user?.name}</td>}
                    <td className="px-6 py-4 font-medium text-slate-800">{order.items?.length}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.total_price}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.status}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{order.location?.area}, {order.location?.street}, {order.location?.building} </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/order/${order.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit Order"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        {user.role_id === 1 &&
                        <Link
                          to={`/edit-order/${order.id}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit Order"
                        >
                          <Pen className="w-5 h-5" />
                        </Link>}
                        {user.role_id === 1 &&
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>}
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
                Showing {orders.length} of {totalItems} orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import api from '../../../Api';
import { toast } from 'react-hot-toast';
import ReactPaginate from "react-paginate";

const Users = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getData = async (page) => {
      try {
        let response = await api.read(`/users?page=${page}&query=${searchQuery}`);
        if (response.data) {
            setUsers(response.data)
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
        let response = await api.read(`/users?page=${page}&query=${searchQuery}`);
        if (response.users) {
            setUsers(response.users)
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
          let response = await api.read(`/search/user?searchTerm=${searchQuery}`);
          if (response.data) {
            setUsers(response.data)
          } else {
            toast.error("Failure to get users"); 
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
          <h2 className="text-2xl font-bold text-slate-800">Customers</h2>
          <p className="text-sm text-slate-500 mt-1">Overview of all customers</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full h-10 pl-4 pr-12 text-sm border rounded-lg focus:outline-none focus:border-slate-400 border-slate-200"
                placeholder="Search users..."
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
                  <th className="px-6 py-4 font-medium">Full name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Phone Number</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{user.phone}</td>
                    <td className="px-6 py-4 text-slate-600">{parseInt(user.role_id) === 1 ? 'Admin' : 'Customer'}</td>
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
                Showing {users.length} of {totalItems} users
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
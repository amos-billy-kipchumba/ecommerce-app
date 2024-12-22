import React, {useState, useEffect, useMemo} from "react";
import { useUser } from "../../../context/UserContext";
import api from "../../../Api";
import { toast } from 'react-hot-toast';
import Avatar from "../../../assets/img/avatar.jpg"
import { Search } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

function UserProfile() {
  const {user} = useUser()
  const [commissions, setCommissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
    const handleGetCommissionByUser = async (e) => {
      
      try {
          let response = await api.consume('/commissions/user/'+user.userId);
          if (response.status === 200) {
              setCommissions(response.commissions);
          } else {
              toast.error(response.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
    }

    handleGetCommissionByUser()
  },[user])

  const allCommissions = useMemo(() => commissions, [commissions]); 
  
  const filteredCommissions = useMemo(() => {
    return allCommissions.filter(commission => {
      const searchStr = searchQuery.toLowerCase();
      return (
        commission.userType.toLowerCase().includes(searchStr)
      );
    });
  }, [searchQuery, allCommissions]);

  const totalPages = Math.ceil(filteredCommissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCommissions = filteredCommissions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    },[]);


  return (
    <div className="bg-gray-50 w-full min-h-full pt-28">
      <div className="container py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src={Avatar}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  alt=""
                ></img>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-gray-700">{user.role}</p>
              </div>
            </div>
          </div>

          <div className="col-span-4 sm:col-span-9 text-left">

            <h2 class="text-xl font-bold mb-4">Commissions</h2>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); 
                  }}
                  className="w-full h-10 pl-4 pr-12 text-sm border rounded-lg focus:outline-none focus:border-slate-400 border-slate-200"
                  placeholder="Search commissions..."
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
                    <th className="px-6 py-4 font-medium">Commission Type</th>
                    <th className="px-6 py-4 font-medium">Currency</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Flight Type</th>
                    <th className="px-6 py-4 font-medium">User Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedCommissions.map((commission) => (
                    <tr key={commission.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{commission.commissionType?.type}</td>
                      <td className="px-6 py-4 text-slate-600">{commission.currency}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{commission.amount}</td>
                      <td className="px-6 py-4 text-slate-600">{commission.status === "0" ? 'Inactive' : 'Active'}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">{commission.flightType}</td>
                      <td className="px-6 py-4 text-slate-600">{commission.userType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-slate-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + ITEMS_PER_PAGE, filteredCommissions.length)}
                </span>{' '}
                of <span className="font-medium">{filteredCommissions.length}</span> results
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm font-medium rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm font-medium rounded-md ${
                      currentPage === pageNum
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm font-medium rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

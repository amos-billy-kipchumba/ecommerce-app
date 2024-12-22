import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Spinner from '../Spinner';
import { useSidebar } from '../../context/SidebarContext';

const Dashboard = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();

    const handleOverlayClick = () => {
        toggleSidebar(false);
    };

    return (
        <Suspense fallback={<Spinner />}>
            <div className="min-h-screen flex flex-col">
                <div className="sticky top-0 z-40">
                    <Topbar />
                </div>
                <div className="flex-1 flex relative">
                    <div
                        className={`
                            fixed inset-y-0 left-0 z-30 w-70 
                            transform transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                            lg:relative lg:translate-x-0 lg:w-70
                        `}
                    >
                        <div className="h-full bg-gray-800 shadow-lg overflow-y-auto">
                            <Sidebar />
                        </div>
                    </div>

                    <div className="flex-1 w-full h-screen overflow-auto">
                        <div className={`
                            w-full h-full
                            ${isSidebarOpen ? 'lg:ml-56' : ''}
                            transition-all duration-300
                        `}>
                            <Outlet />
                        </div>
                    </div>

                    {isSidebarOpen && (
                        <div 
                            onClick={handleOverlayClick}
                            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden cursor-pointer"
                            aria-hidden="true"
                        />
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default Dashboard;
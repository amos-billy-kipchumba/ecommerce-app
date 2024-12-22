import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, GridIcon, UserIcon, CogIcon, ArchiveIcon, InboxIcon, UsersIcon, ShoppingBagIcon } from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';
import Avatar from "../../assets/img/avatar.png"
import { useUser } from '../../context/UserContext';

const Topbar = () => {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const {isSidebarOpen, toggleSidebar} = useSidebar();
  const {user, clearUser} = useUser();
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const appsRef = useRef(null);
  const profileRef = useRef(null);

  const toggleSidebarMobile = () => {
    toggleSidebar()
  };
  const toggleNotifications = () => setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  const toggleApps = () => setIsAppsDropdownOpen(!isAppsDropdownOpen);
  const toggleProfile = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target) &&
        appsRef.current && !appsRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setIsNotificationDropdownOpen(false);
        setIsAppsDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      user: { name: 'Bonnie Green', image: '/images/users/bonnie-green.png' },
      message: 'Hey, what\'s up? All set for the presentation?',
      time: 'a few moments ago',
      type: 'message'
    },
    {
      id: 2,
      user: { name: 'Jese Leos', image: '/images/users/jese-leos.png' },
      message: 'and 5 others started following you.',
      time: '10 minutes ago',
      type: 'follow'
    }
  ];

  const apps = [
    { id: 1, name: 'Sales', icon: ShoppingBagIcon },
    { id: 2, name: 'Users', icon: UsersIcon },
    { id: 3, name: 'Inbox', icon: InboxIcon },
    { id: 4, name: 'Profile', icon: UserIcon },
    { id: 5, name: 'Settings', icon: CogIcon },
    { id: 6, name: 'Products', icon: ArchiveIcon }
  ];

  return (
    <nav className="fixed z-30 w-full bg-yellow-400 dark:border-gray-700 lg:px-10 backToBack">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Left side: Logo and Search */}
          <div className="flex items-center justify-start">
            {/* Mobile Sidebar Toggle */}
            <button 
              onClick={toggleSidebarMobile}
              className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {!isSidebarOpen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            
            <Link to="/" className="flex ml-2 md:mr-24">
              <img src="/logo.png" className="h-12 mr-3" alt="FlowBite Logo" />
            </Link>
          </div>

          {/* Right side: Notifications, Theme, Profile */}
          <div className="flex items-center">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 text-gray-500 hidden rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" />
              </button>

              {isNotificationDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-72 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div className="block px-4 py-2 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    Notifications
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-600">
                    {notifications.map((notification) => (
                      <Link
                        key={notification.id} 
                        to="/"
                        className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 group"
                      >
                        <div className="flex-shrink-0">
                          <img 
                            className="rounded-full w-11 h-11" 
                            src={notification.user.image} 
                            alt={notification.user.name} 
                          />
                        </div>
                        <div className="w-full pl-3">
                          <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {notification.user.name}
                            </span> {notification.message}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-500">
                            {notification.time}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/"
                    className="block py-2 text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Apps Dropdown */}
            <div className="relative" ref={appsRef}>
              <button
                onClick={toggleApps}
                className="p-2 text-gray-500 hidden rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <span className="sr-only">View apps</span>
                <GridIcon className="w-6 h-6" />
              </button>

              {isAppsDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-72 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                  <div className="block px-4 py-2 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    Apps
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {apps.map((app) => (
                      <Link
                        key={app.id} 
                        to="/"
                        className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                      >
                        <app.icon className="w-7 h-7 text-gray-500 dark:text-gray-400 group-hover:text-primary-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                          {app.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-500 dark:text-gray-400 hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative ml-3" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={Avatar}
                  alt="user pic"
                />
              </button>

              {isProfileDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 top-full">
                    <div className="px-4 py-3 flex flex-col text-left">
                      <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
                    </div>
                    <ul className="p-1">
                      <li>
                        <button 
                          onClick={(e) => {
                            e.preventDefault()
                            localStorage.removeItem('token')
                            localStorage.removeItem('user')
                            navigate('/')
                            clearUser()
                          }}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default Topbar;
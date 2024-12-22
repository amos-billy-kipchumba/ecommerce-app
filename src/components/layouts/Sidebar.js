import React, { useState } from 'react';
import {
  Home,
  Users,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Globe,
  Pen,
  Building2,
  MapPin,
  ShoppingCart,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

function MenuItem({ item, isNested = false }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    if (item.subItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`${isNested ? 'ml-6' : ''}`}>
      <Link
        to={item.path}
        onClick={handleClick}
        className="flex items-center gap-4 px-4 py-2 mb-2 text-gray-300 rounded hover:bg-gray-700 hover:text-white transition-all duration-200 cursor-pointer"
      >
        <span className="w-5">{item.icon}</span>
        <span className="text-sm font-medium flex-1">{item.name}</span>
        {item.subItems && (
          <span className="text-xs">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </Link>

      {item.subItems && isOpen && (
        <div className="ml-4 transition-all duration-200">
          {item.subItems.map((subItem, index) => (
            <MenuItem key={index} item={subItem} isNested={true} />
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar() {
  const { user } = useUser();

  const menuItems = [
    {
      name: 'Profile',
      icon: <Users size={20} />,
      path: '/profile',
      subItems: [
        {
          name: 'Change Password',
          icon: <Pen size={20} />,
          path: '/change-password',
        },
      ],
    },
    {
      name: 'Orders',
      icon: <ShoppingCart size={20} />,
      path: '/orders',
      subItems: [
        {
          name: 'Order List',
          icon: <ShoppingCart size={16} />,
          path: '/orders',
        }
      ],
    },

    ...(parseInt(user.role_id) !== 2
      ? [
          { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
          {
            name: 'Customers',
            icon: <Users size={20} />,
            path: '/users',
            subItems: [
              { name: 'User List', icon: <Users size={16} />, path: '/users' },
            ],
          },
          {
            name: 'Products',
            icon: <Package size={20} />,
            path: '/products',
            subItems: [
              {
                name: 'Product List',
                icon: <Package size={16} />,
                path: '/products',
              },
              {
                name: 'Create Product',
                icon: <PlusCircle size={16} />,
                path: '/create-product',
              },
            ],
          },
          {
            name: 'Categories',
            icon: <Globe size={20} />,
            path: '/categories',
            subItems: [
              {
                name: 'Category List',
                icon: <Globe size={16} />,
                path: '/categories',
              },
              {
                name: 'Create Category',
                icon: <PlusCircle size={16} />,
                path: '/create-category',
              },
            ],
          },
          {
            name: 'Brands',
            icon: <Building2 size={20} />,
            path: '/brands',
            subItems: [
              {
                name: 'Brand List',
                icon: <Building2 size={16} />,
                path: '/brands',
              },
              {
                name: 'Create Brand',
                icon: <PlusCircle size={16} />,
                path: '/create-brand',
              },
            ],
          },
          {
            name: 'Locations',
            icon: <MapPin size={20} />,
            path: '/locations',
            subItems: [
              {
                name: 'Location List',
                icon: <MapPin size={16} />,
                path: '/locations',
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-800 text-white min-w-64 p-4 flex flex-col z-50">
      <nav className="flex-1 mt-20 text-left">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>
      <div className="mt-auto">
        <p className="text-center text-sm text-gray-500">
          © 2024 E-shop. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;

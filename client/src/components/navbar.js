import React from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Navbar = () => {
  return (
    <nav className="bg-[#F8F7ED] p-4 flex justify-between items-center">
      <a href="/home">
        <div className="flex items-center">
          <img src="/mindscribe_logo.png" alt="Logo" className="w-14 h-14 mr-2" />
          <h1 className="text-[#1E1E1E] text-xl font-semibold">MindScribe</h1>
        </div>
      </a>

      <div className="font-pacifico">
        <div className="flex items-center space-x-4 text-[#1E1E1E] text-[16px]">
          <a href="/home">
            Home
          </a>
          <a href="/contact">
            Contact Us
          </a>
          <a href="/about">
            About Us
          </a>
          <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/pfp.png"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 font-protest-riot text-sm text-black text-bold')}
                      >
                        LOG OUT
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <span className="ml-2 text-base text-[14px]">Biraj</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

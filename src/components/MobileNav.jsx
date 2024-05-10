import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ArrowRightEndOnRectangleIcon,BuildingStorefrontIcon,HomeIcon,Bars3Icon } from '@heroicons/react/16/solid';
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setName } from "../redux/store";
import { useNavigate } from "react-router-dom";

export default function MobileNav() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    googleLogout();
    dispatch(setName(""));
    navigate("/");
  };

  return (
    <div className="sm:hidden z-20 relative ml-auto flex justify-center items-center">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <Bars3Icon className="size-5 fill-white/75" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
          
            anchor="bottom end"
            className="w-52 z-20  relative origin-top-right rounded-xl border border-white/5 bg-neutral-800 p-1 text-sm/6 text-black [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={() => navigate("/dashboard")}>
                <HomeIcon className="size-4 fill-white/75" />
                <p className='text-gray-200'>My Dashboard</p>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10" onClick={() => navigate("/courses")}>
                <BuildingStorefrontIcon className="size-4 fill-white/75" />
                <p className='text-gray-200'>Course Market</p>
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <button
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                onClick={() => setShowConfirmation(true)}
              >
                <ArrowRightEndOnRectangleIcon className="size-4 fill-white/75" />
                <p className='text-gray-200'>Logout</p>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed min-h-screen inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-neutral-200 p-8 rounded-lg">
            <p className="mb-4 font-bold text-black text-lg">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center">
              <button
                className="mr-2 px-4 py-2 bg-red-800  text-white rounded-md"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500  text-white rounded-md"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

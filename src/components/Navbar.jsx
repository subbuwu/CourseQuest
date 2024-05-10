import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/store";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";


function Navbar() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const logOut = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    googleLogout();
    dispatch(setName(""));
    navigate("/");
  };

  return (
    <nav className="z-20 fixed top-0 w-full border-b  backdrop-blur-sm bg-black/[0.6] border-zinc-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 px-4 sm:px-0 ">
            <div
              className="flex flex-shrink-0 items-center font-bold text-2xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="font-bold text-white text-xl md:text-2xl ">
                Course Sphere
              </span>
              <img
                className="ml-2 w-12 h-12 rounded-full"
                src="https://wellfound.com/cdn-cgi/image/width=732,height=457.5,fit=cover,gravity=0.5x0.5,quality=90,format=auto/https://d2gn4xht817m0g.cloudfront.net/p/media_uploads/images/original/000/735/567/735567-35f1bdd85f4bcdd2605f74703230c6ef52977b1b.png"
                alt=""
              />
            </div>

            <MobileNav/>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div className="flex justify-center items-center gap-2">
              <button
                  className="p-[3px] sm:block hidden relative"
                  onClick={() => navigate("/courses")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    Course Market
                  </div>
                </button>
                <button
                  className="p-[3px] sm:block hidden relative"
                  onClick={() => navigate("/dashboard")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    My Dashboard
                  </div>
                </button>
                <button
                  className="p-[3px] sm:block hidden relative"
                  onClick={() => setShowConfirmation(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </nav>
  );
}

export default Navbar;

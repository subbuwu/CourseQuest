import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { setEmail, setName, setPicture } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { db } from "../db/firebase.js";
import { TypewriterEffect } from "../components/typewriter.jsx";
import toast from "react-hot-toast";
import { BentoGridSection } from "./BentoGridSection.jsx";

function AuthFlow() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const [user, setUser] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setUser(codeResponse);

      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`
        );

        const email = res.data.email;
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // User exists, retrieve user data and set in Redux
          toast.success("Welcome back! Happy Learning.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          const doc = querySnapshot.docs[0];
          const userData = doc.data();
          dispatch(setName(userData.name));
          dispatch(setEmail(userData.email));
          dispatch(setPicture(userData.picture));
          setTimeout(() => {
            navigate("/courses");
          }, 1000);
        } else {
          // User does not exist, add new document to Firebase
          toast.success("Sign In Successfull , Happy Learning.", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
          const docRef = await addDoc(collection(db, "users"), {
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
          });
          console.log("Document written with ID: ", docRef.id);
          dispatch(setName(res.data.name));
          dispatch(setEmail(res.data.email));
          dispatch(setPicture(res.data.picture));
          setTimeout(() => {
            navigate("/courses");
          }, 1000);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const words = [
    {
      text: "Explore",
    },
    {
      text: "a",
    },
    {
      text: "world",
    },
    {
      text: "of",
    },
    {
      text: "Knowledge",
    },
    {
      text: "with",
    },
    {
      text: "Our",
      className: "italic text-gray-300",
    },
    {
      text: "Courses.",
      className: "italic text-gray-300",
    },
  ];

  return (
    <div className="text-white pt-28 px-8">
      {/* <h1 className="relative z-10 text-4xl md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
        Explore a World of Knowledge <br /> with Our Courses 
      </h1> */}
      <div className="flex flex-col">
        <p className="text-neutral-400 text-center mb-6  md:text-3xl text-lg ">
          The road to knowledge starts from here
        </p>
        <TypewriterEffect words={words} />
      </div>
      {/* Unlock your potential with our diverse selection of courses covering a wide range of topics, designed to inspire and educate. */}
      <div className="w-full flex justify-center items-center mt-10">
        <button
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={userName ? () => navigate("/courses") : login}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-lg font-medium text-white backdrop-blur-3xl">
            {userName ? "Go to Course Market" : "Login With Google"}
          </span>
        </button>
      </div>

      <h1 className="mt-10 relative z-10 text-2xl md:text-3xl bg-gradient-to-b bg-clip-text text-transparent  from-neutral-200 to-neutral-600   text-center font-sans font-medium">
        Powered by{" "}
        <a target="_blank" href="https://alemeno.com/" className="underline font-black text-[#dfdada] italic" >
          Alemeno
        </a>
      </h1>

      <BentoGridSection/>
    </div>
  );
}

export default AuthFlow;

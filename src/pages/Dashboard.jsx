import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const userName = useSelector((state) => state.user.name);
  
  const purchasedCourses = useSelector((state) => state.user.purchasedCourses);

  if (!userName) {
    return (
      <p className="w-full min-h-screen flex items-center justify-center text-5xl">
        Please Login First
      </p>
    );
  }

  return (
    <div className="pt-28 px-10 w-full min-h-screen">
      <div className="mb-6 text-center text-3xl font-medium text-gray-300">
        Welcome back, {userName} ! Here are the courses you've enrolled in.
      </div>
      <section className="w-fit mx-auto grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 justify-items-center justify-center gap-y-[5rem] gap-x-14 mt-10 mb-10">
        {purchasedCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;



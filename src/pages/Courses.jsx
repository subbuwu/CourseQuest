import React, { useEffect } from "react";
import CourseCard from "../components/CourseCard.jsx";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../db/firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { addCourse,addPurchasedCourse } from "../redux/store.js";
import { useState } from "react";

const Courses = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const purchasedCourses = useSelector((state) => state.user.purchasedCourses)
  const courses = useSelector((state) => state.courses);
  const [searchQuery,setSearchQuery] = useState("")
  const [filteredCourses,setFilteredCourses] = useState([]);

  if (!userName) {
    return (
      <p className="w-full min-h-screen flex items-center justify-center text-5xl">
        Please Login First
      </p>
    );
  }


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const allCourses = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Add document ID to course data
          ...doc.data()
        }));
        // Filter courses based on user's email
        const coursesFilteredByUser = allCourses.filter((course) =>
          course.enrolledStudents.some((student) => student.email === userEmail)
        );
        coursesFilteredByUser.forEach((course) => {
          dispatch(addPurchasedCourse(course)); // Dispatch course data along with ID
        });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (userEmail && purchasedCourses.length === 0) {
      fetchCourses();
    }
  }, [purchasedCourses,courses]);


  useEffect(() => {

    const getCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      querySnapshot.forEach((doc) => {
        // Pass both document data and document ID to addCourse
        dispatch(addCourse({ ...doc.data(), id: doc.id }));
      });
    };

    if(courses.length <= 1 ) {
      getCourses();
    }

  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="pt-28 px-10 w-full min-h-screen">
      <div className="mb-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400 text-3xl md:text-5xl font-medium ">
        Course Market : Explore Our Wide Range Of Courses !
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by course name or instructor... etc"
          className="w-[400px] p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <section className="w-fit mx-auto grid md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 justify-items-center justify-center gap-y-[5rem] gap-x-14 mt-10 mb-10">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} userEmail={userEmail} />
        ))}
      </section>
    </div>
  );
};

export default Courses;

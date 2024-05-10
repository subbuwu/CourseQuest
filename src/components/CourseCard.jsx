import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import { HeartIcon } from '@heroicons/react/16/solid';

const CourseCard = ({ course, userEmail }) => {
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [likes, setLikes] = useState(course.likes || 0); // Initialize likes count

  const navigate = useNavigate();

  useEffect(() => {
    const checkIfEnrolled = async () => {
      const courseRef = doc(db, "courses", course.id.toString());
      const courseSnap = await getDoc(courseRef);
      const currentEnrolledStudents = courseSnap.data().enrolledStudents || [];
      const isAlreadyEnrolledStudent = currentEnrolledStudents.some(
        (enrolledStudent) => enrolledStudent.email === userEmail
      );
      setIsAlreadyEnrolled(isAlreadyEnrolledStudent);
    };

    checkIfEnrolled();
  }, [course, userEmail]);

  const handleLike = async () => {
    const courseRef = doc(db, "courses", course.id.toString());
    try {
      await updateDoc(courseRef, {
        likes: likes + 1, // Increment likes count by 1
      });
      setLikes(likes + 1); // Update local state with new likes count
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div
      className="card relative z-10 xl:w-auto lg:w-96 md:w-[22rem] sm:w-[24rem] bg-neutral-700 shadow-xl transition-all duration-200flex flex-col"
    >
      <div className="absolute -z-10 inset-0 h-full w-full bg-gradient-to-r from-teal-600 to-teal-900 transform scale-[0.70] bg-red-500 rounded-full blur-3xl" />
      <img
        src={`${course.thumbnail}`}
        alt="Course Thumbnail"
        className="border-b-slate-100 rounded-t-xl border-b-[2px] object-cover bg-cover h-[236px]"
      />
      <div className="card-body flex-1  cursor-pointer " >
        <h2 className="card-title text-white font-bold" onClick={()=>navigate(`/courses/${course.id}`)}>{course.courseName} (Click Course Title To Know More)</h2>
        <p className="font-normal">{course.description}</p>
        <div className="justify-end">
          <div className="mr-2 badge badge-accent text-medium mb-1">{isAlreadyEnrolled ? "Already Enrolled" : "Click For More Details"}</div>
          <div className="badge mr-2 font-black text-gray-300">By {course.instructor}</div>
          <div className={`${course.enrollmentStatus === "Closed" ? "badge badge-error" : "badge bg-yellow-200 font-black text-black"}`}>Status: {course.enrollmentStatus}</div>
        </div>
        <div className="absolute justify-center items-center flex gap-2 top-4 right-4">
          <HeartIcon onClick={handleLike} className="hover:fill-white hover:scale-125 size-6 fill-white/75" />
          <span className="badge text-lg">{likes} Likes</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

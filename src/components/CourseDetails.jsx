import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { addPurchasedCourse, enrollStudent } from "../redux/store";
import { db } from "../db/firebase";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const userPicture = useSelector((state) => state.user.picture);
  const purchasedCourses = useSelector((state) => state.user.purchasedCourses);
  const courses = useSelector((state) => state.courses);
  const course = courses.find((course) => course.id === courseId);

  useEffect(() => {
    if (course) {
      checkIfEnrolled();
    }
  }, [course]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const checkIfEnrolled = async () => {

    const courseRef = doc(db, "courses", courseId.toString());
    const courseSnap = await getDoc(courseRef);
    const currentEnrolledStudents = courseSnap.data().enrolledStudents || [];
    
    const isAlreadyEnrolledStudent = currentEnrolledStudents.some(
      (enrolledStudent) => enrolledStudent.email === userEmail
    );
    setIsAlreadyEnrolled(isAlreadyEnrolledStudent);
  };

  const handleEnrollCourseAndPurchase = async () => {

    if (userName && userEmail && userPicture && !isAlreadyEnrolled) {
      const courseRef = doc(db, "courses", courseId.toString());
      const courseSnap = await getDoc(courseRef);
      const currentEnrolledStudents =
      courseSnap.data().enrolledStudents || [];

      const student = {
        name: userName,
        email: userEmail,
        picture: userPicture,
      };
      const updatedEnrolledStudents = [...currentEnrolledStudents, student];

      let courseToAdd = { ...course, enrolledStudents: updatedEnrolledStudents };

      dispatch(addPurchasedCourse(courseToAdd));
      dispatch(enrollStudent({ id: courseId, student }));



      await updateDoc(courseRef, {
        enrolledStudents: updatedEnrolledStudents,
      });


      toast.success('Course Bought ! Check Your Dashboard To Start Learning.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#4ce110',
          secondary: '#FFFAEE',
        },
      });

      setIsAlreadyEnrolled(true);
    }
  };

  const handleAlreadyClick = () => {
    toast.error("Already Enrolled In Course !")

  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-28 w-full min-h-[100vh] overflow-y-scroll bg-neutral-900 text-white">
      <section className="mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-12">
        <div className="max-w-lg mx-auto">
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="rounded-lg  shadow-2xl"
          />
        </div>
        <div className="max-w-2xl mx-auto bg-white text-black rounded-xl shadow-xl p-6">
          <h1 className="text-3xl font-bold mb-4">{course.courseName}</h1>
          <p className="text-lg mb-2 font-black underline">
            Instructor: {course.instructor}
          </p>
          <p className="mb-6 font-medium">{course.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-neutral-600">
                <strong>Enrollment Status:</strong>{" "}
                <div
                  className={`${course.enrollmentStatus == "Closed" ? "badge badge-error" : "badge badge-accent"} `}
                >
                  {course.enrollmentStatus}
                </div>
              </div>
              <div className="text-neutral-600">
                <strong>Duration:</strong>{" "}
                <div className="badge badge-accent">{course.duration}</div>
              </div>
              <div className="text-neutral-600">
                <strong>Schedule:</strong>{" "}
                <div className="bg-gray-600 rounded-xl p-2 text-white">{course.schedule}</div>
              </div>
            </div>
            <div>
              <div className="text-neutral-600">
                <strong>Location:</strong>{" "}
                <div className="badge badge-accent">{course.location}</div>
              </div>
              <p className="text-neutral-600">
                <strong>Prerequisites:</strong> {course.prerequisites}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex w-full">
        <button
          className={` px-12 mt-4 mx-auto py-4 rounded-full ${course.enrollmentStatus == "Closed" ? "bg-red-500" : "bg-[#1ED760] hover:bg-[#44e021]  "} font-bold text-white tracking-widest uppercase transform hover:scale-105 transition-colors duration-200 `}
          onClick={course.enrollmentStatus == "Closed" ? ()=>toast.error("Course Currently Closed") : isAlreadyEnrolled ? handleAlreadyClick : handleEnrollCourseAndPurchase}
        >
           {course.enrollmentStatus == "Closed" ? "Closed" : isAlreadyEnrolled ? "Already Enrolled" : "Buy Now"}
        </button>
        
      </div>
      <section className="mt-6 mb-14 mx-auto px-4 overflow-y-scroll">
        <div className="collapse collapse-arrow bg-base-200">
          <input
            type="radio"
            name="my-accordion-2"
            checked={isOpen}
            onChange={toggleAccordion}
            onClick={toggleAccordion}
          />
          <div className="collapse-title text-center text-3xl font-medium">
            Syllabus
          </div>
          <div className={`collapse-content ${isOpen ? "collapse-open" : ""}`}>
            {course.syllabus.map((week, index) => (
              <div
                key={index}
                className="bg-gray-400 text-black my-4 px-8 sm:text-xl text-base rounded-xl"
              >
                <p className="font-bold badge my-1">Week {week.week}</p>
                <ul>
                  <li>
                    <strong>{week.topic}</strong>: {week.content}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;

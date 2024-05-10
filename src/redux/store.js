import { createSlice, configureStore } from '@reduxjs/toolkit';

// Example course model


const initialState = {
  user: {
    name: '',
    email: '',
    picture: '',
    purchasedCourses: [],
  },
  courses: [],
  mounted: {
    mounted : false
  },
};

const mountedSlice = createSlice({
  name: 'mounted',
  initialState: initialState.mounted,
  reducers: {
    setMounted: (state, action) => {
      state.mounted = action.payload;
    }
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPicture: (state,action) => {
      state.picture = action.payload
    },
    addPurchasedCourse: (state,action) => {
      state.purchasedCourses.push(action.payload);
    }
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState: initialState.courses,
  reducers: {
    addCourse: (state, action) => {
      // Destructure id and rest of the course data from action.payload
      const { id, ...courseData } = action.payload;
      // Add id to courseData and push it to state
      state.push({ ...courseData, id });
    },
    enrollStudent: (state, action) => {
      // student = { id, name, email }
      const { id, student } = action.payload;
      const courseIndex = state.findIndex(course => course.id === id);
      if (courseIndex !== -1) {
        // Create a copy of the course object to update
        const updatedCourse = { ...state[courseIndex] };
        // Update the enrolledStudents array immutably
        updatedCourse.enrolledStudents = [...updatedCourse.enrolledStudents, student];
        // Update the state immutably
        state[courseIndex] = updatedCourse;
      }
    },
  },
});

export const { setName, setEmail, setPicture,addPurchasedCourse } = userSlice.actions;
export const { addCourse, enrollStudent } = courseSlice.actions;
export const { setMounted } = mountedSlice.actions

const rootReducer = {
  user: userSlice.reducer,
  courses: courseSlice.reducer,
  mounted: mountedSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/drop-down-menu.css';
import Students from './components/students';
import Courses from './components/courses';
import StudentsWithCourses from './components/studentsWithCourses';
import CoursesWithStudents from './components/coursesWithStudents';
import StudentAndCourses from './components/studentCourses';
import CreateStudent from './components/createStudent';
import UpdateStudent from './components/updateStudent';
import DeleteStudent from './components/deleteStudent';
import CreateCourse from './components/createCourse';
import UpdateCourse from './components/updateCourse';
import DeleteCourse from './components/deleteCourse';
import CreateStudentCourse from './components/createStudentCourse';
import UpdateStudentCourse from './components/updateStudentCourse';
import DeleteStudentCourse from './components/deleteStudentCourse';
import './styles/hover-over.css';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/students" className="nav-link">Students</Link>
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-link">Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/studentAndCourses" className="nav-link">Student and Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/studentsWithCourses" className="nav-link">Students with Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/coursesWithStudents" className="nav-link">Courses with Students</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manage
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link to="/create-student" className="dropdown-item">Create Student</Link></li>
                  <li><Link to="/create-course" className="dropdown-item">Create Course</Link></li>
                  <li><Link to="/assign-student-to-course" className="dropdown-item">Assign Student to the Course</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
        <Route path="/delete-student/:id" element={<DeleteStudent />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />
        <Route path="/delete-course/:id" element={<DeleteCourse />} />

        <Route path="/studentAndCourses" element={<StudentAndCourses />} />
        <Route path="/update-student-course/:id" element={<UpdateStudentCourse />} />
        <Route path="/delete-student-course/:id" element={<DeleteStudentCourse />} />

        <Route path="/studentsWithCourses" element={<StudentsWithCourses />} />
        <Route path="/coursesWithStudents" element={<CoursesWithStudents />} />

        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/assign-student-to-course" element={<CreateStudentCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentPortal from './components/StudentPortal';
import Tables from './components/Tables';
import Home from './components/Home';
import Jobs from './Pages/Jobs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Your custom CSS
import Usertable from './components/data-table.jsx/Userstable';
import Admintable from './components/data-table.jsx/Admintable';


function App() {
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('animate__animated', 'animate__fadeInUp'); // Apply desired animation
  //           observer.unobserve(entry.target); // Stop observing after animation is applied
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.1, // Trigger animation when 10% of the component is visible
  //     }
  //   );

  //   // Observe all elements with the 'animate-on-scroll' class
  //   const elements = document.querySelectorAll('.animate-on-scroll');
  //   elements.forEach((element) => observer.observe(element));

  //   // Cleanup function to disconnect the observer
  //   return () => {
  //     elements.forEach((element) => observer.unobserve(element));
  //   };
  // }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/student' element={<StudentPortal />} />
          <Route path='/Table' element={<Tables />} />
          <Route path='/job' element={<Jobs />} />
          <Route path='/userdata' element={<Usertable/>}/>
          <Route path='/admindata' element={<Admintable/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

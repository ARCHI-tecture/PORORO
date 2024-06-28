import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoutineMain from './pages/routine/RoutineMain';
import { RoutineCreate } from './pages/routine/RoutineCreate';
import CategoryMain from './pages/category/CategoryMain';
// import Calendar from './pages/home/Calendar'; // 파일 경로가 정확한지 확인4
// import Calendar from './pages/home/Calendar';
import HomeCalendar from './pages/home/HomeCalendar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Calendar />} /> */}
          <Route path="/" element={<HomeCalendar />} />
          <Route path="/routine" element={<RoutineMain />} />
          <Route path="/routinecreate" element={<RoutineCreate />} />
          <Route path="/category" element={<CategoryMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

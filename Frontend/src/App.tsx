import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoutineMain from './pages/routine/RoutineMain';
import { RoutineCreate } from './pages/routine/RoutineCreate';

import CategoryMain from './pages/category/CategoryMain';
// import Calendar from './pages/home/Calendar';
// import HomeCalendar from './pages/home/HomeCalendar';
// import Test from './pages/home/Test';
import Feed from './pages/home/Feed/Feed';
import TimerMain from './pages/timer/TimerMain';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Calendar />} /> */}
          {/* <Route path="/" element={<Test />} /> */}
          <Route path="/" element={<Feed />} />
          <Route path="/routine" element={<RoutineMain />} />
          <Route
            path="/routinecreate"
            element={<RoutineCreate categoryIndex={0} />}
          />
          <Route path="/category" element={<CategoryMain />} />
          <Route path="/pomodoro" element={<TimerMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

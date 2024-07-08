import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoutineMain from './pages/routine/RoutineMain';
import CategoryMain from './pages/category/CategoryMain';
// import Calendar from './pages/home/Calendar';
// import HomeCalendar from './pages/home/HomeCalendar';
// import Test from './pages/home/Test';
// import Feed from './pages/home/Feed/Feed';
import TimerMain from './pages/timer/TimerMain';
import RecordMain from './pages/record/RecordMain';
import { RoutineCreate } from './pages/routine/RoutineList/RoutineCreate';
// import Calendar from './pages/home/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Calendar />} />
          <Route path="/" element={<Test />} /> */}
          {/* <Route path="/" element={<Feed />} /> */}
          <Route path="/routine" element={<RoutineMain />} />
          <Route path="/routinecreate" element={<RoutineCreate />} />
          <Route path="/category" element={<CategoryMain />} />
          <Route path="/pomodoro" element={<TimerMain />} />
          <Route path="/record" element={<RecordMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

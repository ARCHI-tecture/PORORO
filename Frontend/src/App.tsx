import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoutineMain from './pages/routine/RoutineMain';
import { RoutineCreate } from './pages/routine/RoutineCreate';
import CategoryMain from './pages/category/CategoryMain';
import TimerMain from './pages/timer/TimerMain';
import { Calendar } from './pages/home/HomeCalendar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
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

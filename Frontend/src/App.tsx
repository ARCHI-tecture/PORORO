import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoutineMain from './pages/routine/RoutineMain';
import CategoryMain from './pages/category/CategoryMain';
import MainHome from './pages/home/MainHome';
import TimerMain from './pages/timer/TimerMain';
import RecordMain from './pages/record/RecordMain';
import { RoutineCreate } from './pages/routine/RoutineList/RoutineCreate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
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

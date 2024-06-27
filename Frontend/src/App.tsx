import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoutineMain from './page/routine/RoutineMain'
import { RoutineCreate } from './page/routine/RoutineCreate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/routine" element={<RoutineMain />} />
          <Route path="/routinecreate" element={<RoutineCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

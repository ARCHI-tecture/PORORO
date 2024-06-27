import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RoutineMain from './pages/routine/RoutineMain';
import { RoutineCreate } from './pages/routine/RoutineCreate';
import CategoryMain from './pages/category/CategoryMain';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/routine" element={<RoutineMain />} />
          <Route path="/routinecreate" element={<RoutineCreate />} />
          <Route path="/category" element={<CategoryMain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

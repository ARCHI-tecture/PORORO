import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryMain from './pages/category/CategoryMain';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/category" element={<CategoryMain />} />
      </Routes>
    </Router>
  );
}

export default App;

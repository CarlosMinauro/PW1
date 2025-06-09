import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import LibrosPage from './pages/LibrosPage';
import VideojuegosPage from './pages/VideojuegosPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/libros" element={<LibrosPage />} />
          <Route path="/videojuegos" element={<VideojuegosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

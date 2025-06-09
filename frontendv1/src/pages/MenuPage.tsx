import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const [name, setName] = useState<string>('');
  const [backendResponse, setBackendResponse] = useState<string>('');
  const navigate = useNavigate();

  const handleLibrosClick = () => {
    if (name) {
      navigate('/libros', { state: { name } });
    } else {
      alert('Por favor, ingresa tu nombre.');
    }
  };

  const handleVideojuegosClick = () => {
    if (name) {
      sessionStorage.setItem('name', name);
      navigate('/videojuegos');
    } else {
      alert('Por favor, ingresa tu nombre.');
    }
  };

  const handleSaludarBackendClick = async () => {
    if (!name) {
      alert('Por favor, ingresa tu nombre para saludar al backend.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/saludar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setBackendResponse(data.message);
    } catch (error) {
      console.error('Error al saludar al backend:', error);
      setBackendResponse('Error al conectar con el backend.');
    }
  };

  return (
    <div className="menu-container">
      <h1>Menú</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleLibrosClick}>LIBROS</button>
        <button onClick={handleVideojuegosClick}>VIDEOJUEGOS</button>
        <button onClick={handleSaludarBackendClick}>SALUDAR BACKEND</button>
      </div>
      {backendResponse && (
        <p className="backend-message">{backendResponse}</p>
      )}
    </div>
  );
};

export default MenuPage; 
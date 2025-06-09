import { useEffect, useState } from 'react';

const VideojuegosPage = () => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="videojuegos-container">
      <h1>Página de Videojuegos</h1>
      <p>Bienvenido, {name}</p>
    </div>
  );
};

export default VideojuegosPage; 
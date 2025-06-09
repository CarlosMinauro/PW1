import { useLocation } from 'react-router-dom';

const LibrosPage = () => {
  const location = useLocation();
  const { name } = location.state as { name: string };

  return (
    <div className="libros-container">
      <h1>Página de Libros</h1>
      <p>Bienvenido, {name}</p>
    </div>
  );
};

export default LibrosPage; 
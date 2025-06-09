# Aplicación Full Stack con Vite + React y Express + Node.js

Este proyecto es una aplicación full stack construida con tecnologías modernas. Consiste en un frontend construido con Vite + React + TypeScript y un backend construido con Express + Node.js + TypeScript.

## Archivos y Directorios a Crear Manualmente

### Backend
1. Crear directorio `backend`:
```bash
mkdir backend
```

2. Crear directorio `src` dentro de backend:
```bash
cd backend
mkdir src
```

3. Crear archivo `.env` en la raíz del backend:
```bash
touch .env
```

4. Crear archivo `index.ts` dentro de src:
```bash
touch src/index.ts
```

5. Crear archivo `tsconfig.json` en la raíz del backend:
```bash
touch tsconfig.json
```

### Frontend
El frontend se crea automáticamente con Vite, pero necesitarás crear los siguientes archivos y directorios para la funcionalidad de navegación:
1. Directorio `src/pages`:
```bash
mkdir src/pages
```
2. Archivo `src/pages/MenuPage.tsx`
3. Archivo `src/pages/LibrosPage.tsx`
4. Archivo `src/pages/VideojuegosPage.tsx`

## Estructura del Proyecto

```
.
├── frontendv1/        # Vite + React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx   # Componente principal de React con enrutamiento
│   │   ├── main.tsx  # Punto de entrada de la aplicación React (anteriormente main.ts)
│   │   ├── index.css # Estilos globales
│   │   ├── App.css   # Estilos de la aplicación
│   │   └── pages/
│   │       ├── MenuPage.tsx       # Pantalla de menú
│   │       ├── LibrosPage.tsx     # Pantalla de libros
│   │       └── VideojuegosPage.tsx # Pantalla de videojuegos
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json # Configuración específica de la aplicación para TypeScript
│   ├── tsconfig.node.json # Configuración de Node para TypeScript
│   └── index.html      # Archivo HTML principal (referencia a main.tsx)
└── backend/          # Express + Node.js + TypeScript backend
    ├── src/
    │   └── index.ts  # Archivo principal del servidor
    ├── package.json
    ├── .env         # Variables de entorno
    └── tsconfig.json
```

## Proceso de Creación y Configuración

### 1. Creación del Frontend (`frontendv1`)

Primero, elimina cualquier intento anterior del frontend para empezar desde cero:
```bash
# Asegúrate de estar en el directorio raíz del proyecto (PWejer1)
# cd .. (si estás dentro de otra carpeta como frontendv1)
Remove-Item -Recurse -Force frontend # Si existía una carpeta 'frontend' anterior
```

Luego, crea el nuevo proyecto frontend con Vite + React + TypeScript:
```bash
npm create vite@latest frontendv1 -- --template react-ts
```

Navega al nuevo directorio del frontend e instala las dependencias de enrutamiento:
```bash
cd frontendv1
npm install react-router-dom
npm install --save-dev @types/react-dom
```

### 2. Creación del Backend
```bash
# Asegúrate de estar en el directorio raíz del proyecto (PWejer1)
# cd .. (si estás dentro de otra carpeta como frontendv1)
mkdir backend
cd backend
npm init -y
npm install express cors dotenv typescript ts-node @types/node @types/express @types/cors
```

## Modificaciones Clave del Frontend (`frontendv1`)

### Renombrar y Actualizar el Punto de Entrada

1.  **Renombrar `src/main.ts` a `src/main.tsx`**: Esto es crucial para que Vite y TypeScript interpreten el código JSX correctamente.
    ```bash
    # Asegúrate de estar en el directorio frontendv1
    # cd frontendv1
    mv src/main.ts src/main.tsx
    ```

2.  **Actualizar `index.html`** para apuntar a `src/main.tsx`:
    ```html
    <!-- frontendv1/index.html -->
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
    ```

### Componente Principal (src/App.tsx)

Se modificó `App.tsx` para configurar el enrutamiento de la aplicación usando `react-router-dom`, reemplazando el contenido de plantilla de Vite. Esto incluye importar `BrowserRouter`, `Routes`, `Route` y los componentes de las páginas.
```typescript
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
```

### Archivo de Entrada Principal (src/main.tsx)

Se actualizó `src/main.tsx` para renderizar el componente `App` de React, en lugar de manipular directamente el DOM:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Páginas de Navegación

1.  **`src/pages/MenuPage.tsx`**: Contiene los botones de navegación. Pasa el nombre a `LibrosPage` vía `state` y a `VideojuegosPage` vía `sessionStorage`.
    ```typescript
    import { useNavigate } from 'react-router-dom';

    const MenuPage = () => {
      const navigate = useNavigate();
      const name = "Usuario";

      const handleLibrosClick = () => {
        navigate('/libros', { state: { name } });
      };

      const handleVideojuegosClick = () => {
        sessionStorage.setItem('name', name);
        navigate('/videojuegos');
      };

      return (
        <div className="menu-container">
          <h1>Menú Principal</h1>
          <div className="button-container">
            <button onClick={handleLibrosClick}>LIBROS</button>
            <button onClick={handleVideojuegosClick}>VIDEOJUEGOS</button>
          </div>
        </div>
      );
    };

    export default MenuPage;
    ```

2.  **`src/pages/LibrosPage.tsx`**: Muestra el nombre recibido por `state`.
    ```typescript
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
    ```

3.  **`src/pages/VideojuegosPage.tsx`**: Obtiene y muestra el nombre guardado en `sessionStorage`.
    ```typescript
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
    ```

### Estilos Básicos (src/App.css)

Se añadieron estilos CSS para mejorar la presentación de las páginas y botones:
```css
.App {
  text-align: center;
  padding: 20px;
}

.menu-container,
.libros-container,
.videojuegos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #535bf2;
}
```

## Configuración del Backend

### Configuración de TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Archivo Principal del Servidor (src/index.ts)
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para saludar
app.post('/api/saludar', (req, res) => {
  const { name } = req.body;
  res.json({ message: `¡Hola, ${name}!` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Scripts del Backend (package.json)
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "watch": "tsc -w"
  }
}
```

## Cómo Ejecutar la Aplicación

1.  **Iniciar el Backend:**
    ```bash
    # Asegúrate de estar en el directorio raíz del proyecto (PWejer1)
    cd backend
    npm install
    npm run dev
    ```
    El backend se ejecutará en `http://localhost:3000`.

2.  **Iniciar el Frontend (`frontendv1`):**
    ```bash
    # Asegúrate de estar en el directorio raíz del proyecto (PWejer1)
    cd frontendv1
    npm install
    npm run dev
    ```
    El frontend se ejecutará en `http://localhost:5173`.

## Interacción Frontend-Backend (Sin Base de Datos)

Para demostrar la comunicación entre el frontend y el backend sin la necesidad de una base de datos, se ha implementado una funcionalidad de saludo personalizado:

*   **Endpoint del Backend:** El backend expone un endpoint en `POST /api/saludar` que recibe un nombre y devuelve un saludo personalizado.
*   **Funcionalidad en el Frontend:** En la `MenuPage` (`frontendv1/src/pages/MenuPage.tsx`), se ha añadido un botón "SALUDAR BACKEND". Al hacer clic en este botón, el frontend envía el nombre del usuario al backend y muestra el saludo personalizado recibido en la misma página.

Esta característica permite verificar que el backend está activo y puede procesar datos enviados desde el frontend, devolviendo una respuesta personalizada.

## Endpoints de la API

### Endpoints del Backend
-   `POST /api/saludar`: Recibe un objeto JSON con un nombre y devuelve un saludo personalizado.
  - **Request Body:** `{ "name": "string" }`
  - **Response:** `{ "message": "¡Hola, {name}!" }`

## Notas de Desarrollo

-   El backend utiliza TypeScript para mayor seguridad de tipos y mejor experiencia de desarrollo.
-   CORS está habilitado para permitir la comunicación entre frontend y backend.
-   Las variables de entorno son soportadas a través de dotenv.
-   El frontend utiliza Vite para desarrollo rápido y construcción.
-   Los componentes de React están escritos en TypeScript para mejor verificación de tipos.

## Variables de Entorno

Backend (`.env`):
```
PORT=3000
```

## Dependencias

### Dependencias del Backend
-   `express`: Framework web.
-   `cors`: Compartir recursos entre orígenes.
-   `dotenv`: Variables de entorno.
-   `typescript`: Soporte para TypeScript.
-   `ts-node`: Ejecución de TypeScript.
-   `@types/*`: Definiciones de tipos para TypeScript.

### Dependencias del Frontend (`frontendv1`)
-   `react`: Biblioteca de UI.
-   `react-router-dom`: Enrutamiento para React.
-   `@types/react-dom`: Definiciones de tipos para `react-dom`.
-   `typescript`: Soporte para TypeScript.
-   `vite`: Herramienta de construcción y servidor de desarrollo.

## Comandos Útiles

### Backend
```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Producción
npm start

# Observar cambios
npm run watch
```

### Frontend (`frontendv1`)
```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Vista previa de producción
npm run preview
``` 
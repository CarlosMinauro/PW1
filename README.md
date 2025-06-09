# Aplicación Full Stack con Vite + React y Express + Node.js

Este proyecto es una aplicación full stack construida con tecnologías modernas. Consiste en un frontend construido con Vite + React + TypeScript y un backend construido con Express + Node.js + TypeScript.

## Archivos y Directorios a Crear/Asegurar

Para que la aplicación funcione correctamente, es importante tener la estructura de archivos adecuada. Aquí se detalla qué directorios y archivos se generan automáticamente al iniciar los proyectos y cuáles necesitarás crear o asegurar manualmente:

### Backend (`backend/`)

La mayoría de los archivos y directorios iniciales del backend se crean manualmente, excepto `package.json` y `package-lock.json` que son generados por npm.

1.  **Directorio `backend/`**: Debes crearlo manualmente.
    ```bash
    mkdir backend
    ```

2.  **Directorio `backend/src/`**: Debes crearlo manualmente dentro de `backend/`.
    ```bash
    cd backend
    mkdir src
    ```

3.  **Archivo `backend/.env`**: Debes crearlo manualmente en la raíz del backend.
    ```bash
    touch .env
    ```

4.  **Archivo `backend/src/index.ts`**: Debes crearlo manualmente dentro de `backend/src/`.
    ```bash
    touch src/index.ts
    ```

5.  **Archivo `backend/tsconfig.json`**: Debes crearlo manualmente en la raíz del backend.
    ```bash
    touch tsconfig.json
    ```

6.  **Archivos `backend/package.json` y `backend/package-lock.json`**: Estos archivos se generan automáticamente al ejecutar `npm init -y` y `npm install` dentro del directorio `backend/`.

### Frontend (`frontendv1/`)

El frontend se genera en gran parte automáticamente con Vite. Después de crear el proyecto con `npm create vite@latest frontendv1 -- --template react-ts`, Vite creará la estructura básica, incluyendo directorios como `src/` y archivos como `App.tsx`, `main.tsx` (originalmente `main.ts`), `index.css`, `App.css`, `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, etc. en la raíz de `frontendv1/`.

Sin embargo, para la funcionalidad de navegación específica de esta aplicación, necesitarás crear los siguientes archivos y directorios adicionales:

1.  **Directorio `frontendv1/src/pages/`**: Debes crearlo manualmente.
    ```bash
    mkdir src/pages
    ```

2.  **Archivo `frontendv1/src/pages/MenuPage.tsx`**: Debes crearlo manualmente.
3.  **Archivo `frontendv1/src/pages/LibrosPage.tsx`**: Debes crearlo manualmente.
4.  **Archivo `frontendv1/src/pages/VideojuegosPage.tsx`**: Debes crearlo manualmente.

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

## Interacción Frontend-Backend (Sin Base de Datos) y Cómo se Conectan

Para que la aplicación funcione como un todo, el frontend y el backend necesitan comunicarse. Aquí se explica cómo lo hacen:

### **1. Estructura Inicial del Proyecto (Lo que ya deberías tener o crear manualmente):**

En la raíz de tu proyecto (por ejemplo, `PWejer1`), deberías tener dos carpetas principales:
*   `frontendv1/` (para la parte de React)
*   `backend/` (para la parte de Express/Node.js)

**Creación de Archivos y Directorios Cruciales (Manual o con comandos):**

Aunque Vite crea gran parte del frontend, hay algunos archivos y directorios clave que necesitarás asegurarte de que existan:

*   **En la carpeta `backend/`:**
    *   `backend/src/`: Aquí irá el código fuente de tu servidor.
    *   `backend/.env`: Para tus variables de entorno (como el puerto del servidor).
    *   `backend/src/index.ts`: El archivo principal de tu servidor.
    *   `backend/tsconfig.json`: La configuración de TypeScript para el backend.

*   **En la carpeta `frontendv1/src/`:**
    *   `frontendv1/src/pages/`: Este directorio contendrá las diferentes páginas de tu aplicación.
    *   Asegúrate de que dentro de `frontendv1/src/pages/` existan estos archivos:
        *   `MenuPage.tsx`
        *   `LibrosPage.tsx`
        *   `VideojuegosPage.tsx`

### **2. Proceso de Creación y Configuración (Instalación de Dependencias):**

Para que el proyecto funcione, necesitas instalar las librerías necesarias para cada parte.

*   **Para el Frontend (`frontendv1`):**
    1.  Abre tu terminal en el directorio `frontendv1/`.
    2.  Instala las dependencias principales y de enrutamiento:
        ```bash
        cd frontendv1
        npm install react-router-dom
        npm install --save-dev @types/react-dom
        ```

*   **Para el Backend (`backend`):**
    1.  Abre tu terminal en el directorio `backend/`.
    2.  Inicializa el proyecto de Node.js e instala las dependencias:
        ```bash
        cd backend
        npm init -y
        npm install express cors dotenv typescript ts-node @types/node @types/express @types/cors
        ```

### **3. Modificaciones Clave en el Código (Lo que se ha cambiado/configurado):**

Aquí están los puntos más importantes que se han modificado o configurado en el código:

*   **Frontend (`frontendv1`)**
    *   **Punto de Entrada (`frontendv1/index.html` y `frontendv1/src/main.tsx`):**
        *   Se renombró `src/main.ts` a `src/main.tsx` para que React con TypeScript funcione correctamente.
        *   El archivo `index.html` ahora apunta a `src/main.tsx` como el punto de entrada de la aplicación.
    *   **Componente Principal (`frontendv1/src/App.tsx`):**
        *   Configurado con `react-router-dom` para manejar la navegación entre las diferentes páginas (`/`, `/libros`, `/videojuegos`).
    *   **Páginas de Navegación (`frontendv1/src/pages/`):**
        *   `MenuPage.tsx`: Es la página principal con botones para navegar a "LIBROS" y "VIDEOJUEGOS". **Importante:** También contiene un campo para ingresar un nombre y un botón "SALUDAR BACKEND" que interactúa con el servidor.
        *   `LibrosPage.tsx`: Muestra el nombre del usuario recibido a través del `state` de `react-router-dom`.
        *   `VideojuegosPage.tsx`: Obtiene y muestra el nombre del usuario almacenado en `sessionStorage`.
    *   **Estilos (`frontendv1/src/App.css`):** Contiene estilos básicos para la presentación de los componentes.

*   **Backend (`backend`)**
    *   **Configuración de TypeScript (`backend/tsconfig.json`):** Configurado para compilar el código TypeScript a JavaScript en el directorio `dist/`.
    *   **Archivo Principal del Servidor (`backend/src/index.ts`):**
        *   Utiliza `express` para el servidor web, `cors` para permitir la comunicación entre frontend y backend, y `dotenv` para cargar variables de entorno (como el puerto).
        *   **Endpoint clave:** Define una ruta `POST` en `/api/saludar`. Este endpoint recibe un nombre del frontend y devuelve un saludo personalizado.
        *   **Código del Endpoint:**
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
    *   **Scripts de Ejecución (`backend/package.json`):** Contiene scripts para iniciar el servidor en modo desarrollo (`npm run dev`), construir el proyecto (`npm run build`), y ejecutarlo en producción (`npm start`).

### **4. Cómo Ejecutar la Aplicación:**

Para ver la aplicación funcionando, debes iniciar tanto el backend como el frontend.

1.  **Iniciar el Backend:**
    *   Abre una terminal.
    *   Navega al directorio `backend/`.
    *   Ejecuta: `npm run dev`
    *   Verás un mensaje indicando que el servidor está corriendo en `http://localhost:3000`.

2.  **Iniciar el Frontend (`frontendv1`):**
    *   Abre **otra terminal** (mantén la del backend abierta y corriendo).
    *   Navega al directorio `frontendv1/`.
    *   Ejecuta: `npm run dev`
    *   Verás un mensaje indicando que el frontend está corriendo en `http://localhost:5173`.

Una vez ambos estén corriendo, abre tu navegador y ve a `http://localhost:5173`.

### **5. Cómo se Realiza la Conexión entre Frontend y Backend:**

La comunicación entre el frontend y el backend se implementa a través de una solicitud HTTP:

*   **En el Frontend (`frontendv1/src/pages/MenuPage.tsx`):**
    *   Cuando haces clic en el botón "SALUDAR BACKEND", se activa la función `handleSaludarBackendClick`.
    *   Esta función hace una solicitud `POST` a la URL `http://localhost:3000/api/saludar`.
    *   Envía un objeto JSON en el cuerpo de la solicitud con el nombre que ingresaste en el campo de texto (ej. `{ "name": "TuNombre" }`).
    *   Espera una respuesta del backend.

*   **En el Backend (`backend/src/index.ts`):**
    *   El servidor de Express tiene definida la ruta `app.post('/api/saludar', ...)`.
    *   Cuando recibe la solicitud `POST` a esa ruta, extrae el `name` del cuerpo de la solicitud (`req.body.name`).
    *   Construye un mensaje de saludo personalizado (ej. "¡Hola, TuNombre!").
    *   Envía este mensaje como una respuesta JSON al frontend (ej. `{ "message": "¡Hola, TuNombre!" }`).

De esta manera, el frontend envía datos al backend y el backend los procesa para devolver una respuesta dinámica, demostrando una interacción básica entre ambas partes de la aplicación.

## Endpoints de la API

### Endpoints del Backend
-   `POST /api/saludar`: Recibe un objeto JSON con un nombre y devuelve un saludo personalizado.
  - **Request Body:** `{ "name": "string" }`
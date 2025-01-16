# Backend - Gestión de Prospectos

Este proyecto proporciona un backend en Node.js con una API REST para gestionar prospectos almacenados en una base de datos MongoDB. Permite listar, ordenar y paginar prospectos, así como calcular un puntaje basado en su experiencia laboral.

---

## Requisitos

- Node.js v16+.
- Docker y Docker Compose para levantar MongoDB.

---

## Instalación

1. Al obtener el proyecto utilizar: "npm install".
2. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
MONGO_URI=mongodb://root:root@localhost:27017/?authSource=admin
PORT=3000
FRONTEND_HOST=http://localhost:5173

3. Levantar MongoDB: "docker-compose up -d"
4. Importar Prospectos desde un Archivo CSV: "node csvToJson.js"
5. Iniciar el servidor: npm run start
6. Calculo del puntaje: 
El puntaje de un prospecto se calcula dinámicamente en función de sus años de experiencia laboral 
``` 
score = yearsOfExperience * 10; 
```

Justificación:
```
El puntaje está basado en la suposición de que a mayor experiencia laboral, mayor es la probabilidad de que el prospecto tenga conocimiento, habilidades y conexiones útiles para cerrar ventas. 
Multiplico los años de experiencia por 10 para darle un peso significativo en comparación a otros campos.
```

7. Endpoints:
Todos los prospects: ```http://localhost:3000/prospects```
Por Name y Ascendentes: ```http://localhost:3000/prospects?sortBy=name&order=asc```
Paginados: ```http://localhost:3000/prospects?page=2&limit=5```
Manejo de errores: ``` http://localhost:3000/prospects?sortBy=invalidField ```

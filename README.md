# Supermercado API con MongoDB

API para la gestión de productos de un supermercado utilizando MongoDB como base de datos. Permite operaciones CRUD (`Create`, `Read`, `Update`, `Delete`) sobre los productos.
## 🧰 Tecnologías utilizadas
`Node.js`, `Express`, `MongoDB`, `dotenv`, `nodemon`

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
<code>```
git clone https://github.com/MoniZuluagaP/ApiNodeYMongo.git```</code>

### 2. Instalar dependencias
    npm install

### 3. Configurar variables de entorno
    PORT=3006
    MONGODB_CONNECTION=mongodb+srv://monicazuldesarrollo:RUhkZOcUZy4UlzRx@cluster0.y9qfmmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


## 📦 Estructura del proyecto
    ApiNodeYMongo/
    ├── origen/
    |    └── mongoDB.js
    |    └── server.js
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    └── README.md

## 📑 Endpoints disponibles

### 1. Ruta raíz
<code>```http
GET /```</code>

### 2. Obtener todos los productos
<code>```http
GET /productos```</code>

### 3. Obtener productos por una categoria
#### Puede ser por nombre parcial de la categoria
<code>```http
GET /productos/categoria/:nombreCategoria```</code>

### 4. Agregar un producto nuevo
<code>```http
POST /productos```</code>

Cuerpo del request (JSON):

{
  "codigo": 123,
  "nombre": "Producto A",
  "precio": 49.99,
  "categoria": "Alimentos"
}

### 5. Modificar un producto por código
#### Modifica los valores que tiene un producto, trae sus propiedades y valida que todas se envien en el body
<code>```http
PUT /productos/:código```</code>

### 6. Eliminar producto por código
<code>```http
DELETE /productos/:código```</code>

## 🗺️ Diagrama de flujo para agregar un producto
```mermaid
flowchart TD
  Start([Inicio POST /productos])
  
  Start --> ParseReq["Leer JSON del cuerpo (req.body)"]
  ParseReq --> ValPrecio{"¿precio > 0?"}
  ValPrecio -- No --> ErrorPrecio["❌ 400: Precio inválido"]
  ValPrecio -- Sí --> ValCodigo{"¿codigo es número?"}
  ValCodigo -- No --> ErrorCodigo["❌ 400: Código inválido"]
  ValCodigo -- Sí --> Conn["Conectar a MongoDB"]
  Conn --> Insertar["Insertar producto en colección 'productos'"]
  Insertar --> Ok["✅ 201: Producto agregado"]
  ErrorPrecio --> End([Fin])
  ErrorCodigo --> End
  Ok --> End
  ```

  ## 👥Integrantes del Grupo 11
  #### Zuluaga, Monica M
  #### Urzagasti, Silvia Liliana

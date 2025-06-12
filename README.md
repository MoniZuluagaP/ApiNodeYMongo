# Supermercado API con MongoDB

API para la gestión de productos de un supermercado utilizando MongoDB como base de datos. Permite operaciones CRUD (`Create`, `Read`, `Update`, `Delete`) sobre los productos.

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

<code>```
git clone https://github.com/MoniZuluagaP/ApiNodeYMongo.git```</code>


### 1. Peticiones
##  Endpoints

### Ruta raíz

<code>```http
GET /```</code>


### Obtener todos los productos
<code>```http
GET /productos```</code>


### Obtener productos de una categoria
<code>```http
GET /productos/categoria/:nombreCategoria```</code>


### Agregar un producto nuevo
<code>```http
POST /productos```</code>


Cuerpo del request (JSON):

{
  "codigo": 123,
  "nombre": "Producto A",
  "precio": 49.99,
  "categoria": "Alimentos"
}


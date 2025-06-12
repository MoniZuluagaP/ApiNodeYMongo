const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { connectToMongoDB, disconnectToMongoDB } = require("./mongoDB");
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3006;

//Middlewares
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Content-type", "application/json; charset=utf-8");
  next();
});

//manejo de ruta raiz
app.get("/", (req, res) => {
  res.status(200).send("Supermercado API con MongoDB");
});

//Obtener todos los productos de la coleccion
app.get("/productos", async (req, res) => {
  let client;
  try {
    client = await connectToMongoDB();
    if (!client) {
      throw new Error("Error al conectarse a MongoDB");
    }

    const db = client.db("supermercado");
    const productos = await db.collection("supermercado").find().toArray();
    res.json(productos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message || "Error interno del servidor");
  } finally {
    if (client) {
      await disconnectToMongoDB();
    }
  }
});

//Obtener productos por categoria (puede ser nombre parcial de la categoria)
app.get("/productos/categoria/:nombreCategoria", async (req, res) => {
  let client;
  try {
    client = await connectToMongoDB();
    if (!client) {
      throw new Error("Error al conectarse a MongoDB");
    }

    const db = client.db("supermercado");

    const nombreCategoria = req.params.nombreCategoria.toLowerCase();
    const productos = await db.collection("productos").find().toArray();
    const productosFiltrados = productos.filter(producto =>
      producto.categoria.toLowerCase().includes(nombreCategoria)
    );

    res.json(productosFiltrados);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor" });
  } finally {
    if (client) {
      await disconnectToMongoDB();
    }
  }
});


// Agregar un producto a la coleccion 
app.post("/productos", async (req, res) => {
  let client;
  try {
    client = await connectToMongoDB();
    if (!client) {
      throw new Error("Error al conectarse a MongoDB");
    }

    const db = client.db("supermercado");

    // Validaciones. Puede no contener alguna de las key:property
    const { codigo, nombre, precio, categoria } = req.body;  //Destructuracion 
    
    if (precio <= 0) {
      return res.status(400).json({ mensaje: "El precio debe ser mayor a 0" });
    }

    if (typeof nuevoProducto.codigo !== 'number' || isNaN(nuevoProducto.codigo)) {
        res.status(400).send('El campo código debe ser un número');
        return;
    }

    // Insertar producto
    await db.collection("productos").insertOne(nuevoProducto);
    res.status(201).json({ mensaje: "Producto agregado a la coleccion" });

  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  } finally {
    if (client) {
      await disconnectToMongoDB();
    }
  }
});


//Modificar un producto de la coleccion
// Modificar los valores de las keys  que tiene un objeto de la coleccion. Trae las propiedades que tiene y valida que todas se envien en el body
app.put("/productos/:codigo", async (req, res) => {
  let client;
  try {
    client = await connectToMongoDB();
    const db = client.db("supermercado");

    // Obtener el producto actual
    const productoActual = await db.collection("productos").findOne({ codigo: req.params.codigo });
    if (!productoActual) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // Validar que req.body tenga  los mismos campos que el producto actual
    const camposActuales = Object.keys(productoActual);
    const camposRecibidos = Object.keys(req.body);
    const faltanCampos = camposActuales.some(campo => !camposRecibidos.includes(campo));

    if (faltanCampos) {
      return res.status(400).json({ mensaje: "Debes enviar todos los campos del producto" });
    }


    // Reemplazar  con los nuevos datos
    await db.collection("productos").replaceOne(
      { codigo: req.params.codigo },
      req.body
    );

    res.json({ mensaje: "Producto actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el producto" });
  } finally {
    await disconnectToMongoDB();
  }
});


// Eliminar producto de la coleccion
app.delete("/productos/:codigo", async (req, res) => {
  let client;
  try {
    client = await connectToMongoDB();
    const db = client.db("supermercado");

    // Obtener el producto actual antes de eliminarlo
    const productoActual = await db.collection("productos").findOne({ codigo: req.params.codigo });
    if (!productoActual) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // Eliminar el producto
    await db.collection("productos").deleteOne({ codigo: req.params.codigo });

    res.json({ mensaje: "Producto eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor" });
  } finally {
    await disconnectToMongoDB();
  }
});


app.use((req, res) => {
  // middleware para manejar rutas inexistentes
  res.status(404).send("Pagina no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
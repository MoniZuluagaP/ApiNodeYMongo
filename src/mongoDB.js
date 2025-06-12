const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_CONNECTION;
const client = new MongoClient(URI); 


console.log("Cadena de conexión a MongoDB:", process.env.MONGODB_CONNECTION);
console.log("CLINENT:", client);



const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
    return client;
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    return null;
  }
};

const disconnectToMongoDB = async () => {
  try {
    await client.close();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
};
module.exports = { connectToMongoDB, disconnectToMongoDB };

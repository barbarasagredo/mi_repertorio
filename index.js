const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.listen(3000, console.log("Servidor encendido en el puerto 3000"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  const cancionAMostrar = repertorio.find((cancion) => cancion.id == id);
  res.json(cancionAMostrar);
});

app.get("/canciones", (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  res.json(repertorio);
});

app.post("/canciones", (req, res) => {
  const nuevaCancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  repertorio.push(nuevaCancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Canción agregada con éxito");
  res.json(repertorio);
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  const indexCancion = repertorio.findIndex((cancion) => cancion.id == id);

  repertorio[indexCancion] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Canción modificada con éxito");
  res.json(repertorio);
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));

  let indexCancion = repertorio.findIndex((cancion) => cancion.id == id);
  repertorio.splice(indexCancion, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Canción eliminada con éxito");
  res.json(repertorio);
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
// {
//   title: String
//   url: String
//   techs: List<String>
// }

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const novoRepositorio = {
    id: uuid(),
    likes: 0,
    title,
    url,
    techs
  };
  
  repositories.push(novoRepositorio);
  
  return response.json(novoRepositorio);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(respositorio => respositorio.id === id);
  
  if (index >= 0) {
    repositories[index] = {
      ...repositories[index],
      title,
      url,
      techs
    }
    return response.json(repositories[index]);
  }

  return response.status(400).json({ error: 'Repositorio não encontrado.'});
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const index = repositories.findIndex(respositorio => respositorio.id === id);
  
  if (index >= 0) {
    repositories.splice(index, 1);
    return response.status(204).send();
  }

  return response.status(400).json({ error: 'Repositorio não encontrado.'});
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(respositorio => respositorio.id === id);

  if (index >= 0) {
    repositories[index].likes++;
    return response.json(repositories[index]);
  }

  return response.status(400).json({ error: 'Repositorio não encontrado.'});
});

module.exports = app;

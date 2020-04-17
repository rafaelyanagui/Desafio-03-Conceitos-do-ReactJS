import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = await api.post("/repositories", {
      title: `Repositorio ${Date.now()}`,
      url: "https://nanoincub.com.br",
      techs: ["NODEJS", "FOCO", "Determinação"],
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const repository = await api.delete(`/repositories/${id}`);

    if (repository.status === 204) {
      const repositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );

      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title, url, techs, likes }) => {
          return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
